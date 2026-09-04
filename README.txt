DÉBORA APARECIDA NAIL DESIGN — VERSÃO ONLINE (BASE)

Esta pasta é a versão preparada para conectar o site ao Supabase.

1. config.js
   - A URL do projeto já está preenchida.
   - Cole SOMENTE a chave publicável (Publishable key) do Supabase em publishableKey.
   - Nunca coloque uma chave service_role/secret no navegador.

2. supabase_setup.sql
   - Abra o SQL Editor do Supabase e execute este arquivo uma vez.
   - Ele adiciona segurança (RLS), ligação com Auth, unicidade de horários e regras para o painel.

3. Cadastro/login
   - Usa Supabase Auth com e-mail e senha.
   - A senha NÃO fica armazenada na tabela clientes.

4. Agendamento
   - Exige login.
   - Lê os horários disponíveis do banco.
   - O banco impede duas reservas no mesmo dia/horário.

5. VIP
   - A cliente vê apenas os próprios pontos.
   - A administradora pode ajustar os pontos pelo painel quando sua conta estiver marcada como is_admin=true.

6. Galeria
   - Nesta etapa as três fotos do studio continuam locais.
   - A integração com Supabase Storage será feita na próxima etapa.

7. Importante
   - O painel administrativo é protegido pela função is_admin() no banco.
   - Não use service_role/secret key no frontend.
