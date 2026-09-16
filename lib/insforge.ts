import { createClient } from '@insforge/sdk';

const baseUrl =
  process.env.NEXT_PUBLIC_INSFORGE_BASE_URL ||
  process.env.INSFORGE_BASE_URL ||
  'https://mscw7kcp.ap-southeast.insforge.app';

const anonKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  process.env.INSFORGE_ANON_KEY ||
  'anon_76eee26f206c53799d5b88a198ba518592e13a62b5045b4e086f069a268ed250';

export const insforge = createClient({
  baseUrl,
  anonKey,
});

export default insforge;
