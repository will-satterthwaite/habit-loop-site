const loopContent = {
  cue: {
    label: "Cue",
    title: "A cue starts the loop.",
    copy:
      "A cue is the trigger that tells your brain to begin a behavior. It can be a sound, feeling, place, time, or situation.",
  },
  routine: {
    label: "Routine",
    title: "A routine is the action you take.",
    copy:
      "The routine is the behavior itself. This might be checking your phone, eating a snack, going for a run, or opening your notes.",
  },
  reward: {
    label: "Reward",
    title: "A reward makes the habit feel worth repeating.",
    copy:
      "A reward is the result your brain likes or remembers. It could be relief, fun, energy, comfort, or a sense of progress.",
  },
};

const answers = {
  cue: "notification sound",
  routine: "checking phone",
  reward: "entertainment",
};

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.scrollTarget);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const loopNodes = document.querySelectorAll(".loop-node");
const loopLabel = document.getElementById("loop-label");
const loopTitle = document.getElementById("loop-title");
const loopCopy = document.getElementById("loop-copy");

loopNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const key = node.dataset.loop;
    const content = loopContent[key];

    loopNodes.forEach((item) => item.classList.remove("is-selected"));
    node.classList.add("is-selected");

    loopLabel.textContent = content.label;
    loopTitle.textContent = content.title;
    loopCopy.textContent = content.copy;
  });
});

document.querySelectorAll(".quiz-group").forEach((group) => {
  group.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => {
      group.querySelectorAll(".option-btn").forEach((item) => {
        item.classList.remove("is-selected");
      });
      button.classList.add("is-selected");
    });
  });
});

const feedback = document.getElementById("activity-feedback");

document.getElementById("check-answers").addEventListener("click", () => {
  const selections = {};

  document.querySelectorAll(".quiz-group").forEach((group) => {
    const selected = group.querySelector(".option-btn.is-selected");
    selections[group.dataset.question] = selected?.dataset.value;
  });

  const missing = Object.values(selections).some((value) => !value);
  if (missing) {
    feedback.className = "feedback-card is-warning";
    feedback.textContent =
      "Pick one answer for Cue, Routine, and Reward before checking your response.";
    return;
  }

  const isCorrect = Object.entries(answers).every(
    ([key, value]) => selections[key] === value
  );

  feedback.className = isCorrect
    ? "feedback-card is-success"
    : "feedback-card is-warning";

  feedback.textContent = isCorrect
    ? "Correct! This shows how cues trigger routines that lead to rewards."
    : "Not quite yet. Try matching the trigger, the action, and the result one more time.";
});

document.getElementById("reset-answers").addEventListener("click", () => {
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.classList.remove("is-selected");
  });
  feedback.className = "feedback-card";
  feedback.textContent =
    "Select one answer for each part of the loop, then check your response.";
});

const previewMap = [
  ["habit-input", "preview-habit", "Choose a daily habit to explore."],
  ["cue-input", "preview-cue", "What triggers it?"],
  ["routine-input", "preview-routine", "What action follows?"],
  [
    "reward-input",
    "preview-reward",
    "What makes the behavior worth repeating?",
  ],
];

previewMap.forEach(([inputId, previewId, fallback]) => {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  input.addEventListener("input", () => {
    preview.textContent = input.value.trim() || fallback;
  });
});

const screens = document.querySelectorAll("[data-screen]");
const navLinks = document.querySelectorAll(".progress-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${id}`
        );
      });
    });
  },
  { threshold: 0.45 }
);

screens.forEach((screen) => observer.observe(screen));
