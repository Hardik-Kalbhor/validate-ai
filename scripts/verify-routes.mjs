const BASE = 'http://127.0.0.1:3000';

async function testPages() {
  const cookieHeader = 'validateai_demo_user=' + encodeURIComponent(JSON.stringify({
    id: '00000000-0000-0000-0000-000000000001',
    email: 'test@validateai.dev',
    full_name: 'Test Founder',
    runs_used: 0,
    runs_limit: 999999,
    is_unlimited: true
  }));

  const pages = [
    { name: 'Landing Page', url: '/', auth: false },
    { name: 'Login Page', url: '/login', auth: false },
    { name: 'Signup Page', url: '/signup', auth: false },
    { name: 'Dashboard', url: '/dashboard', auth: true },
    { name: 'Validate Form', url: '/validate', auth: true },
    { name: 'Results: Home Cooks Tiffin', url: '/validate/demo-run-1', auth: true },
    { name: 'Results: AI WhatsApp Kirana', url: '/validate/demo-run-2', auth: true },
    { name: 'Results: Short Video Drama', url: '/validate/demo-video', auth: true },
    { name: 'Results: EdTech Peer Tutoring', url: '/validate/demo-edtech', auth: true },
    { name: 'Results: B2B Wholesale SaaS', url: '/validate/demo-saas', auth: true },
    { name: 'Health Check', url: '/api/health', auth: false }
  ];

  let allPassed = true;
  for (const page of pages) {
    const start = Date.now();
    const headers = {};
    if (page.auth) headers['cookie'] = cookieHeader;
    const res = await fetch(BASE + page.url, { headers });
    const text = await res.text();
    const elapsed = Date.now() - start;
    console.log('[' + res.status + '] ' + page.name.padEnd(30) + ' in ' + elapsed + 'ms (length: ' + text.length + ' bytes)');
    if (res.status !== 200) {
      allPassed = false;
      console.error('FAILED page response:', text.substring(0, 300));
    }
  }

  if (!allPassed) {
    process.exit(1);
  }
}

testPages().catch((err) => {
  console.error(err);
  process.exit(1);
});
