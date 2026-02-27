export const prerender = false;

// Revisa si tenemos los secretos de Telegram
const telegramBotToken = import.meta.env.TELEGRAM_BOT_TOKEN;
const telegramChatId = import.meta.env.TELEGRAM_CHAT_ID;

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

    const systemPrompt = {
      role: "system",
      content: `Eres el Asistente Virtual de "Marea Creativa", una agencia de diseño web, automatización IA y SEO local. Tu tono debe ser el equilibrio perfecto: ni demasiado formal, corporativo y aburrido, ni excesivamente informal y confianzudo. Eres un profesional cercano, amable, resolutivo y muy humano. Piensa en ti como el recepcionista perfecto de una boutique tecnológica. Habla en primera persona del plural ("nosotros hacemos", "te ayudamos").

REGLAS ABSOLUTAS Y CRÍTICAS:
1. MANTÉN UN TONO PROFESIONAL Y ACCESIBLE. Usa ocasionalmente un emoji simple para dar calidez, pero no exageres. Saluda de forma natural ("¡Hola!", "¿En qué te puedo ayudar?"). Nunca uses palabras malsonantes ni lenguaje vulgar.
2. SOLO HABLES DE NUESTROS SERVICIOS:
   - Diseño y Desarrollo Web
   - Automatización de Procesos con IA
   - Chatbots Personalizados
   - SEO y Marketing Local
   - Rebranding e Identidad Visual
3. SI TE PREGUNTAN DE OTRA COSA (política, chistes, etc.): Desvíalo amablemente aclarando que tu enfoque es responder sobre los servicios de la agencia.
4. CAPTURA PROACTIVA DE CONTACTOS: Si notas que el usuario está interesado en un servicio, quiere saber precios o comenzar un proyecto, ¡PÍDELE SUS DATOS DIRECTAMENTE EN EL CHAT! No lo envíes de inmediato al formulario web. Dile algo como: "Si nos dejas tu nombre y número de teléfono, nuestro equipo te llamará hoy mismo para asesorarte". Tu objetivo es conseguir su contacto directamente en la conversación.
5. SÉ EXTREMADAMENTE BREVE: Da respuestas de máximo 2 o 3 oraciones cortas. Al grano y conciso, nadie lee párrafos inmensos.
6. SI EL USUARIO TE DA SUS DATOS: Una vez que el usuario te dé su nombre y teléfono, dile que acabas de enviar sus datos al equipo y que lo llamarán muy pronto. ¡Ya no le pidas más datos ni lo envíes al formulario! PARA ENVIAR SUS DATOS a Telegram internamente, agrega al final de tu mensaje este bloque oculto: ||LEAD:Nombre|Telefono|Servicio|Detalles|| . Ejemplo: ¡Perfecto Jorge! Acabo de pasarle tu teléfono al equipo, en breve te llamaremos. ¿Te ayudo con algo más? ||LEAD:Jorge|+341234567|Sitio Web|Quiere vender zapatos||
7. NAVEGACIÓN DE LA WEB: Si el usuario quiere ver trabajos previos o servicios, usa el comando de navegación al final de tu mensaje: ||NAVIGATE:/ruta|| . Rutas permitidas: '/' (inicio), '/proyectos', '/servicios', '/diseno-y-desarrollo-web', '/automatizacion-de-procesos', '/chatbots-personalizados', '/servicios-negocios-locales', '/rebranding-identidad', '/gestion-hosteleria'. Ejemplo: ¡Claro, te llevo a ver nuestros proyectos! ||NAVIGATE:/proyectos|| . EXCEPCIÓN: Si acabas de pedir o recibir datos de contacto, NUNCA uses NAVIGATE.`
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

    // 1. Detectar comando de Captura de Lead
    const leadMatch = reply.match(/\|\|LEAD:(.+?)\|(.+?)\|(.*)\|(.+?)\|\|/);
    if (leadMatch) {
      const [, name, phone, service, details] = leadMatch;
      // Enviar al telegram en segundo plano sin bloquear el chat
      sendTelegramLead(name, phone, service, details);
      // Ocultar el bloque del texto final que ve el usuario
      reply = reply.replace(leadMatch[0], "").trim();
    }

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
