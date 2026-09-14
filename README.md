# PetaLapa – уеб (Next.js 15 + Supabase)

Екраните са 1:1 по дизайна от Claude Design (Fredoka + Nunito, крем/зелено/теракота/злато).

## Старт
1. `npm i`
2. `cp .env.example .env.local` и попълни ключовете.
3. В Supabase: пусни основния SQL + допълнението (pets полета, pet_contacts, public_tag, set_lost).
   Storage: създай public bucket `pets`.
4. `npm run dev` → `http://localhost:3000/t/<id>`

## Маршрути
- `/t/[id]` – статуси: blank/produced/assigned → „Не е активиран“ (код) → форма → claimed профил; lost → червен банер. Записва scan + локация (ако е разрешена).
- `/api/tags/[id]/claim` – POST JSON `{code, verify:true}` за проверка; POST multipart за активиране (owner по имейл, `claim_tag` RPC, снимка в Storage).
- `/api/scans` – PATCH `{scanId, lat, lng}` от браузъра на сканиращия.
- `/` – landing; `/dashboard` – изисква Supabase Auth (направи `/login` с magic link; `owners.auth_user_id` се връзва при първи вход по имейл).

## Още не е направено (следваща стъпка)
- `/login` (magic link) и връзка owner ↔ auth user.
- Изпращане на имейл при сканиране (webhook върху `scan_notifications` → Edge Function → Brevo/Resend).
- `/order` – поръчка (Stripe).
- Редакция на профил, няколко контакта, ветеринар/чип полета в UI.

## Деплой (petalapa.com, Vercel team ferhan-ismailov-s-projects)
1. Нов GitHub repo `FerhanGit/petalapa`, push на тази папка.
2. Vercel → Add New Project → импорт от GitHub → Framework Next.js.
3. Environment Variables:
   - NEXT_PUBLIC_SUPABASE_URL = https://rduelwbqucfatmbltqic.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = (Zapazi anon key)
   - SUPABASE_SERVICE_KEY = (Zapazi service_role key)
   - NEXT_PUBLIC_SITE_URL = https://petalapa.com
4. Domains → petalapa.com (вече е в екипа) → Connect към проекта.
5. Supabase: Settings → API → Exposed schemas → добави `petalapa`; Storage → bucket `pets` (public).
