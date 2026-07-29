-- Coller ce SQL dans l'éditeur SQL de Supabase et cliquer "Run"

create table if not exists kv_store (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- Autoriser la lecture publique (articles, likes, commentaires)
alter table kv_store enable row level security;

create policy "Lecture publique"
  on kv_store for select
  using (true);

create policy "Ecriture publique"
  on kv_store for all
  using (true)
  with check (true);
