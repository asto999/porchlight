// ===== Demo chat =====
(function () {
  const log = document.getElementById("chatLog");
  const chips = document.getElementById("chatChips");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");

  const rules = [
    {
      keys: ["cost", "price", "pricing", "charge", "expensive", "much does", "fee"],
      reply:
        "Pricing depends on your channels and how many conversations you get — most businesses land on a flat monthly fee plus a one-time setup. I'll give you an exact number on a quick call, no guesswork.",
    },
    {
      keys: ["platform", "whatsapp", "instagram", "website", "channel", "where"],
      reply:
        "I can run on your website chat, WhatsApp Business, or Instagram DMs — wherever your customers are already messaging you. Most businesses start with one channel and add more later.",
    },
    {
      keys: ["setup", "how long", "launch", "build", "implement"],
      reply:
        "About a week, start to finish. Most of that time is Ashu learning your business — your FAQs, your tone, your edge cases — not writing code.",
    },
    {
      keys: ["hindi", "language", "marathi", "speak"],
      reply:
        "Yes — I can answer in English or Hindi, and switch mid-conversation if that's how your customers write.",
    },
    {
      keys: ["secure", "security", "privacy", "data"],
      reply:
        "Your data stays yours — it isn't used to train anything outside your account, and you can ask for a conversation to be deleted any time.",
    },
    {
      keys: ["human", "handoff", "real person", "transfer", "escalate"],
      reply:
        "If a conversation needs a real person — an upset customer, an unusual request — I'll say so in the chat and loop one in right away. I don't try to fake my way through those.",
    },
    {
      keys: ["who are you", "what are you", "are you ai", "bot"],
      reply:
        "I'm a custom AI agent, built by Ashu for a specific business — right now, I'm set up to talk about Porchlight itself. A version of me for your business would only know about your business.",
    },
    {
      keys: ["hi", "hello", "hey", "yo", "sup"],
      reply:
        "Hey — good to meet you. Ask me about pricing, setup time, which platforms I work on, or anything else you'd ask before trying this for your own business.",
    },
  ];

  function findReply(text) {
    const t = text.toLowerCase();
    for (const rule of rules) {
      if (rule.keys.some((k) => t.includes(k))) return rule.reply;
    }
    return "That's the kind of question that's easier to answer on a real call, looking at your actual business. Want me to set up 20 minutes with Ashu?";
  }

  function scrollToBottom() {
    log.scrollTop = log.scrollHeight;
  }

  function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg--user";
    div.innerHTML = `<p></p>`;
    div.querySelector("p").textContent = text;
    log.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "msg msg--bot";
    div.innerHTML = `<p></p>`;
    div.querySelector("p").textContent = text;
    log.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "msg msg--bot msg--typing";
    div.id = "typingIndicator";
    div.innerHTML =
      '<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>';
    log.appendChild(div);
    scrollToBottom();
    return div;
  }

  function ask(text) {
    if (!text.trim()) return;
    addUserMessage(text);
    const typingEl = showTyping();
    const delay = 600 + Math.random() * 500;
    setTimeout(() => {
      typingEl.remove();
      addBotMessage(findReply(text));
    }, delay);
  }

  chips.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    ask(btn.dataset.q);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    ask(text);
  });
})();

// ===== ROI calculator =====
(function () {
  const messagesEl = document.getElementById("roiMessages");
  const minutesEl = document.getElementById("roiMinutes");
  const rateEl = document.getElementById("roiRate");
  const hoursOut = document.getElementById("roiHours");
  const moneyOut = document.getElementById("roiMoney");

  const AUTOMATION_RATE = 0.7;

  function format(num) {
    return Number(num).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  }

  function recalc() {
    const messages = Math.max(0, Number(messagesEl.value) || 0);
    const minutes = Math.max(0, Number(minutesEl.value) || 0);
    const rate = Math.max(0, Number(rateEl.value) || 0);

    const hoursSaved = (messages * AUTOMATION_RATE * minutes) / 60;
    const moneySaved = hoursSaved * rate;

    hoursOut.textContent = format(hoursSaved);
    moneyOut.textContent = "₹" + format(moneySaved);
  }

  [messagesEl, minutesEl, rateEl].forEach((el) =>
    el.addEventListener("input", recalc)
  );
  recalc();
})();

// ===== Contact form =====
(function () {
  const form = document.getElementById("contactForm");
  const confirmEl = document.getElementById("contactConfirm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cName").value.trim();
    const business = document.getElementById("cBusiness").value.trim();
    const email = document.getElementById("cEmail").value.trim();
    const message = document.getElementById("cMessage").value.trim();

    const subject = `Interested in Porchlight — ${business}`;
    const body = [
      `Name: ${name}`,
      `Business: ${business}`,
      `Email: ${email}`,
      ``,
      message,
    ].join("\n");

    const mailto = `mailto:rajputashutosh999@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    confirmEl.textContent =
      "Opening your email app with this filled in — just hit send.";
    confirmEl.hidden = false;
  });
})();
