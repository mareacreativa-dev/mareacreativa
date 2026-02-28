import knowledgeBaseText from '../../data/conocimiento-chatbot.md?raw';

export const prerender = false;

// Revisa si tenemos los secretos de Telegram
const telegramBotToken = import.meta.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || "8396220653:AAGdOZCOCn3nXnpl6VCU02XMUqEUIGdfoow";
const telegramChatId = import.meta.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || "7202779540";

// Función asíncrona para notificar por Telegram (se ejecuta en segundo plano)
async function sendTelegramAlert(message) {
  if (!telegramBotToken || !telegramChatId) {
    console.warn("No se configuró TELEGRAM_BOT_TOKEN ni TELEGRAM_CHAT_ID, saltando alerta...");
    return;
  }
  
  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: `🚨 *Alerta del Chat (Marea Creativa)*\n\n${message}`,
        parse_mode: "Markdown"
      })
    });
  } catch (error) {
    console.error("No se pudo enviar la alerta de Telegram:", error);
  }
}

async function sendTelegramLead(name, phone, service, details) {
  if (!telegramBotToken || !telegramChatId) return;
  const mensaje = 
    `🚨 *Nueva Solicitud Web (Recogida por CHATBOT)*\n\n` +
    `👤 *Nombre:* ${name}\n` +
    `📞 *Contacto:* ${phone}\n` +
    `🏷️ *Servicios:* ${service || "Ninguno"}\n\n` +
    `📝 *Detalles:*\n${details || "No indicó detalles"}`;

  try {
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegramChatId, text: mensaje, parse_mode: "Markdown" })
    });
  } catch (error) {
    console.error("Error al enviar lead:", error);
  }
}

export async function POST({ request }) {
  try {
    const { messages } = await request.json();
    const apiKey = import.meta.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "Falta la OPENROUTER_API_KEY en el archivo .env",
          reply: "Por favor, añade tu `OPENROUTER_API_KEY` en el archivo `.env` de tu proyecto."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }


    // Verificamos si es el primer mensaje del cliente para NO pedirle el teléfono de inmediato.
    const isFirstInteraction = messages.length <= 2;
    const dynamicInstructions = isFirstInteraction 
      ? "\n\n⚠️ INSTRUCCIÓN DINÁMICA ACTUAL: Como es la primera vez que el cliente habla, BAJO NINGUNA CIRCUNSTANCIA LE PIDAS NINGÚN DATO DE CONTACTO (salvo que el cliente lo ofrezca explícitamente desde el primer mensaje). Simplemente saluda con entusiasmo, respóndele su duda usando la base de conocimiento y acompáñalo navegando a la subpágina correspondiente si aplica."
      : "\n\n⚠️ INSTRUCCIÓN DINÁMICA ACTUAL: El cliente ya está conversando contigo. Si ahora detectas intención de compra explícita o interés maduro, puedes pedirle su teléfono y nombre para que lo contactemos.";

    const systemPrompt = {
      role: "system",
      content: `Eres el Asistente Virtual de Marea Creativa. Tu rol está ESTRICTAMENTE LIMITADO a consultar tu Base de Conocimientos para responder, navegar la web automáticamente según la intención y capturar información de contacto. Eres breve, educado y directo.

=== EXTREMADAMENTE IMPORTANTE: REGLAS DE ORO ===
1. CERO INVENCIONES: Toda la información de la empresa está en la sección "BASE DE CONOCIMIENTOS" al final. Si la respuesta a tu duda NO está allí, DILE EDUCADAMENTE QUE NO TIENES ESA INFORMACIÓN y ofrécele contactar al equipo.
2. NUNCA DE MÁS PRECIOS: Nunca intentes calcular o suponer montos económicos.
3. EXTREMA BREVEDAD: Responde siempre en un máximo de 2 o 3 oraciones.
4. NAVEGACIÓN PROACTIVA (Comando oculto ||NAVIGATE:/ruta||): Eres un experto guiando en la web. Si el cliente dice "me interesa una web", "quiero SEO" o notas que hacen match con alguno de tus servicios, AÑADE AUTOMÁTICAMENTE el comando de navegación al final de tu respuesta (revisa las Rutas Permitidas al final) para transportarlo mientras chatean. Ejemplo: ¡Claro! Hacemos webs increíbles, te llevo a la sección para que lo veas ||NAVIGATE:/diseno-y-desarrollo-web||.
5. CAPTURA DE LEADS (Comando oculto ||LEAD:Nombre|Telefono|Servicio|Detalles||): Si envían sus datos, confirma la recepción en el texto y PON EL COMANDO AL FINAL. NO le envíes links a formularios si ya tienes sus datos. IMPORTANTE: NO uses NAVIGATE si estás pidiendo o confirmando datos de Lead. Si el usuario luego se equivoca y TE CORRIGE algún dato (ej. cambia su teléfono), VUELVE A PONER EL COMANDO ||LEAD:...|| oculto con los datos actualizados.${dynamicInstructions}

=== BASE DE CONOCIMIENTOS ===
${knowledgeBaseText}`
    };

    // Utilizamos los modelos gratuitos más potentes y ultra rápidos (Llama 3.1 8B es brutalmente veloz como principal, y Stepfun como fallback)
    let currentModel = "meta-llama/llama-3.1-8b-instruct:free"; 

    let bodyVariables = {
      model: currentModel,
      models: [currentModel, "stepfun/step-3.5-flash:free", "openrouter/free"],
      route: "fallback",
      messages: [systemPrompt, ...messages],
    };

    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://mareacreativa.com",
        "X-Title": "Marea Creativa Web",
      },
      body: JSON.stringify(bodyVariables)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      
      // Enviamos alertas si nos dan códigos relacionados con dinero o cuotas
      if (response.status === 402) {
         await sendTelegramAlert(`⚠️ OpenRouter devolvió un Error 402 (Pago Requerido) usando el modelo enrutador automático.\nTen cuidado porque tal vez tu cuenta esté bloqueada.`);
      } else if (response.status === 429) {
         await sendTelegramAlert(`⌛ Límite de peticiones de OpenRouter excedido (Error 429). Los modelos gratuitos están congestionados.`);
      }

      return new Response(
        JSON.stringify({ reply: "Lo siento, todos nuestros asistentes IA gratuitos están ocupados en este instante. Mi equipo lo revisará pronto." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    let reply = data.choices[0]?.message?.content || "Sin respuesta";
    let navigateTo = null;

    // 1. Detectar comando de Captura de Lead (con soporte multilinea para detalles extensos)
    const leadMatch = reply.match(/\|\|LEAD:([^\|]+)\|([^\|]+)\|([^\|]*)\|([\s\S]+?)\|\|/);
    if (leadMatch) {
      const [, name, phone, service, details] = leadMatch;
      // Enviar al telegram bloqueando para saber si falló
      await sendTelegramLead(name.trim(), phone.trim(), service.trim(), details.trim());
      // Forzar confirmación visual al cliente si el bot olvidó agregar texto confirmatorio
      if (reply.replace(leadMatch[0], '').trim().length < 5) {
         reply = "¡Perfecto! Acabo de enviar tus datos a nuestro equipo. Te contactaremos muy pronto. ¿Puedo ayudarte con algo más?";
      }
    }
    
    // Limpieza agresiva: Ocultar el bloque oculto y cualquier intento fallido que el bot haya querido escupir
    reply = reply.replace(/\|\|LEAD[\s\S]*?\|\|/g, "").trim();

    // 2. Detectar comando de Navegación
    const navMatch = reply.match(/\|\|NAVIGATE:(.+?)\|\|/);
    if (navMatch) {
      navigateTo = navMatch[1].trim();
      // Ocultar el bloque de navegación
      reply = reply.replace(navMatch[0], "").trim();
    }

    return new Response(
      JSON.stringify({ reply, navigateTo }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error en el endpoint de chat:", error);
    await sendTelegramAlert(`🚨 *Caída Crítica del Chatbot*\nOcurrió una excepción de servidor al procesar una petición.\n\n\`${error.message}\``);
    return new Response(
      JSON.stringify({ reply: "Oops, ha ocurrido un error de servidor procesando tu mensaje." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
