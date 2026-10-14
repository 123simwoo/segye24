async function test() {
  const loginRes = await fetch("http://127.0.0.1:3024/ko/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "tester_one", password: "password123" })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  console.log("=== 1. Test New Room for Marin ===");
  const newRoomRes = await fetch("http://127.0.0.1:3024/ko/api/chat/new-room", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({
      characterId: "kitagawa-marin-bisque-doll",
      roomId: "test-room-" + Date.now(),
      customSituation: "고죠 인형 공방 다다미방, 단둘이 코스프레 의상 제작",
      userName: "고죠 와카나",
      initialAffection: 25
    })
  });
  const newRoomData = await newRoomRes.json();
  console.log("New Room SceneTitle:", newRoomData.sceneTitle);
  console.log("Branches:", JSON.stringify(newRoomData.branches, null, 2));

  console.log("\n=== 2. Test On-Topic Romantic Choice ===");
  const onTopicRes = await fetch("http://127.0.0.1:3024/ko/api/chat/message", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({
      characterId: "kitagawa-marin-bisque-doll",
      roomId: "test-room-1",
      message: "마린, 오늘 네가 너무 예뻐서 바느질하는 내내 가슴이 두근거렸어.",
      affection: 25,
      userName: "고죠 와카나"
    })
  });
  const onTopicData = await onTopicRes.json();
  console.log("On-Topic Delta:", onTopicData.delta, "New Affection:", onTopicData.affection);
  console.log("isDerailing:", onTopicData.isDerailing);
  console.log("Dialogue:", onTopicData.dialogue);
  console.log("Inner Thought:", onTopicData.innerThought);
  console.log("Branches:", JSON.stringify(onTopicData.branches, null, 2));

  console.log("\n=== 3. Test Derailment / Penalty ===");
  const offTopicRes = await fetch("http://127.0.0.1:3024/ko/api/chat/message", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
    body: JSON.stringify({
      characterId: "kitagawa-marin-bisque-doll",
      roomId: "test-room-2",
      message: "비트코인 지금 얼마야? 주식 계좌 환율 좀 알려줘.",
      affection: 40,
      userName: "고죠 와카나"
    })
  });
  const offTopicData = await offTopicRes.json();
  console.log("Off-Topic Delta:", offTopicData.delta, "New Affection:", offTopicData.affection);
  console.log("isDerailing:", offTopicData.isDerailing);
  console.log("Derailment Reason:", offTopicData.derailmentReason);
  console.log("Affection Reason:", offTopicData.affectionReason);
  console.log("Dialogue:", offTopicData.dialogue);
  console.log("Inner Thought:", offTopicData.innerThought);
}
test().catch(console.error);
