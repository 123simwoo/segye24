const dbLayer = require('./db.js');

const targetUsername = process.argv[2];

if (!targetUsername) {
  console.log('\n=========================================');
  console.log('       SEGYE 24 관리자(Admin) 설정 도구    ');
  console.log('=========================================');
  console.log('현재 등록된 회원 목록:');
  const users = dbLayer.getAllUsers();
  if (!users || users.length === 0) {
    console.log('  (등록된 회원이 없습니다. 웹에서 먼저 회원가입을 진행해주세요.)');
  } else {
    users.forEach(u => {
      const roleStr = u.role === 'admin' ? '👑 관리자' : '일반회원';
      const adultStr = u.is_adult ? '🔞 성인' : '미인증';
      console.log(`  - [ID #${u.id}] 아이디: ${u.username} | 닉네임: ${u.nickname} | 등급: ${roleStr} | 상태: ${u.status} | 성인: ${adultStr}`);
    });
  }
  console.log('\n[사용법]');
  console.log('  node make_admin.js <아이디>');
  console.log('\n[예시]');
  console.log('  node make_admin.js admin');
  console.log('  node make_admin.js myusername\n');
  process.exit(0);
}

try {
  const updated = dbLayer.setUserAsAdmin(targetUsername);
  console.log('\n=========================================');
  console.log(`✅ [${updated.username}] 회원이 최고 관리자(Admin)로 승격되었습니다!`);
  console.log(`- 역할(role): ${updated.role}`);
  console.log(`- 승인(status): ${updated.status}`);
  console.log(`- 19금 권한(is_adult): ${updated.is_adult ? '🔞 해금됨' : '미허용'}`);
  console.log('=========================================');
  console.log('👉 이제 웹 페이지에서 로그아웃 후 다시 로그인하시거나 F5 새로고침을 하시면 [👑 회원 승인 관리] 버튼이 활성화됩니다.\n');
} catch (err) {
  console.error(`\n❌ 오류: ${err.message}\n`);
  process.exit(1);
}
