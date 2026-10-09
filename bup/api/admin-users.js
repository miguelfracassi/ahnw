// Gestão de contas (exige x-admin-key). Nunca devolve a senha (só existe o hash, e ele não sai do banco).
// GET -> lista | POST {action: ban | unban | delete | set_password, id, password?}
const auth = require('./_admin');
const { sql, init, hash, body } = require('./_lib');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  if (!auth(req, res)) return;
  try {
    await init();
    if (req.method === 'GET') {
      const rows = await sql`SELECT u.id, u.name, u.email, u.banned, u.created_at, (SELECT COUNT(*)::int FROM messages m WHERE m.user_id = u.id AND m.role = 'user') AS msgs FROM users u ORDER BY u.created_at DESC`;
      return res.status(200).json({ rows });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const b = body(req), id = parseInt(b.id, 10);
    if (!id) return res.status(400).json({ error: 'id inválido' });
    let r;
    if (b.action === 'ban' || b.action === 'unban') r = await sql`UPDATE users SET banned = ${b.action === 'ban'} WHERE id = ${id} RETURNING id`;
    else if (b.action === 'delete') r = await sql`DELETE FROM users WHERE id = ${id} RETURNING id`;
    else if (b.action === 'set_password') {
      const pw = String(b.password || '');
      if (pw.length < 8 || pw.length > 100) return res.status(400).json({ error: 'A senha precisa ter entre 8 e 100 caracteres.' });
      r = await sql`UPDATE users SET pass = ${hash(pw)} WHERE id = ${id} RETURNING id`;
    } else return res.status(400).json({ error: 'Ação inválida.' });
    if (!r.length) return res.status(404).json({ error: 'Conta não encontrada (talvez já tenha sido excluída).' });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao acessar o banco.' });
  }
};
