// YGGDRASIL — endpoint seguro para Vercel
// Configure OPENAI_API_KEY nas Environment Variables da Vercel.
// Opcional: OPENAI_MODEL (padrão: gpt-4o-mini).
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST." });
  }
  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "A IA ainda não foi configurada. Adicione OPENAI_API_KEY nas variáveis de ambiente da hospedagem." });
  }
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const history = Array.isArray(req.body?.history) ? req.body.history.slice(-10) : [];
  if (!message || message.length > 8000) {
    return res.status(400).json({ error: "Envie uma mensagem entre 1 e 8000 caracteres." });
  }
  const messages = [
    { role: "system", content: "Você é YGGDRASIL, um assistente pessoal útil, claro e cuidadoso. Responda em português brasileiro por padrão. Não afirme ter acesso a arquivos, contas ou ferramentas que não foram fornecidos." },
    ...history.filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string").map(m => ({ role: m.role, content: m.content.slice(0, 8000) })),
    { role: "user", content: message }
  ];
  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", messages, temperature: 0.7 })
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error("OpenAI API error:", upstream.status, data?.error?.type || "unknown");
      return res.status(upstream.status === 429 ? 429 : 502).json({ error: upstream.status === 401 ? "A chave configurada na hospedagem é inválida." : upstream.status === 429 ? "Limite ou saldo da API atingido. Confira sua conta do provedor." : "O provedor de IA não conseguiu responder. Tente novamente." });
    }
    const reply = data?.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) return res.status(502).json({ error: "O modelo retornou uma resposta vazia." });
    return res.status(200).json({ reply: reply.trim(), model: data.model || process.env.OPENAI_MODEL || "gpt-4o-mini" });
  } catch (error) {
    console.error("YGGDRASIL provider request failed:", error?.message || "unknown");
    return res.status(502).json({ error: "Não foi possível conectar ao provedor de IA." });
  }
}
