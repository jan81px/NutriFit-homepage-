document.addEventListener("DOMContentLoaded", function () {
    let workoutSelect = document.getElementById("workout");
    let sportsSelect = document.getElementById("sports");
    let sportsDiv = document.getElementById("sports-options");
    let frequencyDiv = document.getElementById("frequency-options");

    // Show or hide options when selecting a workout
    workoutSelect.addEventListener("change", function () {
        let workout = this.value;
        sportsDiv.classList.add("hidden");
        frequencyDiv.classList.add("hidden");

        if (workout === "sports") {
            sportsDiv.classList.remove("hidden");
        } else if (workout !== "") {
            frequencyDiv.classList.remove("hidden");
        }
    });

    // Show frequency when a sport is selected
    sportsSelect.addEventListener("change", function () {
        if (this.value !== "") {
            frequencyDiv.classList.remove("hidden");
        } else {
            frequencyDiv.classList.add("hidden");
        }
    });
});

// Generate personalized plan
function generatePlan() {
    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let gender = document.getElementById("gender").value;
    let goal = document.getElementById("goal").value;
    let workout = document.getElementById("workout").value;
    let sport = document.getElementById("sports").value;
    let frequency = document.getElementById("frequency").value;

    let allergies = [];
    document.querySelectorAll(".checkbox-group input[type=checkbox]:checked").forEach((checkbox) => {
        if (checkbox.parentElement.parentElement.previousElementSibling.textContent === "Allergies:") {
            allergies.push(checkbox.value);
        }
    });

    let diets = [];
    document.querySelectorAll(".checkbox-group input[type=checkbox]:checked").forEach((checkbox) => {
        if (checkbox.parentElement.parentElement.previousElementSibling.textContent === "Diets:") {
            diets.push(checkbox.value);
        }
    });

    let workoutPlan = [];
    let dietPlan = ["🍽️ Balanced Nutrition: Fuel your body with the right food!"];

    // Workout Plan based on selection
    if (workout === "strength") {
        workoutPlan.push("💪 Strength Training: Focus on heavy lifts to build muscle!");
        workoutPlan.push("🏋️ Squats, deadlifts, and bench presses 3x per week.");
        if (goal === "muscle_gain") workoutPlan.push("🔥 Increase protein intake for muscle growth!");
    } else if (workout === "cardio") {
        workoutPlan.push("🏃 Cardio Boost: Get your heart pumping!");
        workoutPlan.push("🚴 Try cycling, running, or HIIT for at least 30 minutes.");
        if (goal === "weight_loss") workoutPlan.push("📉 Maintain a calorie deficit for fat loss.");
    } else if (workout === "balanced") {
        workoutPlan.push("⚖️ Balanced Routine: Best of both worlds!");
        workoutPlan.push("💪 Strength training & 🏃 cardio 4x per week.");
    } else if (workout === "pilates") {
        workoutPlan.push("🧘 Pilates Power: Strengthen your core!");
        workoutPlan.push("💃 Improves flexibility & posture with bodyweight exercises.");
    } else if (workout === "yoga") {
        workoutPlan.push("🧘‍♂️ Yoga: Enhance flexibility & mental focus.");
        workoutPlan.push("🌿 Try Hatha or Vinyasa yoga for relaxation.");
    } else if (workout === "crossfit") {
        workoutPlan.push("🔥 CrossFit: High-intensity strength & endurance workouts!");
        workoutPlan.push("🏋️ Functional training & Olympic lifts.");
    } else if (workout === "dance") {
        workoutPlan.push("💃 Dance Workouts: Fun & effective cardio!");
        workoutPlan.push("🎵 Try Zumba, hip-hop, or ballet for fitness.");
    } else if (workout === "hiit") {
        workoutPlan.push("⚡ HIIT: Short, intense bursts of exercise!");
        workoutPlan.push("🔥 Burn fat fast with 20-minute sessions.");
    } else if (workout === "sports") {
        workoutPlan.push(`⚽ Sport Focus: Train like an athlete in ${sport.replace("_", " ")}!`);
        workoutPlan.push(`🔥 Practice ${frequency} per week for skill improvement.`);
        workoutPlan.push("🏋️ Add strength & agility workouts to boost performance.");
    }

    // Gender-Based Adjustments
    if (gender === "female") {
        workoutPlan.push("💃 Focus on core strength, flexibility & endurance.");
    } else if (gender === "male") {
        workoutPlan.push("💪 Focus on strength, endurance, and lean muscle mass.");
    }

    // Diet Plan based on selection
    if (diets.includes("Vegetarian")) {
        dietPlan.push("🥦 Vegetarian Diet: Load up on tofu, beans, and greens!");
    }
    if (diets.includes("Carnivore")) {
        dietPlan.push("🥩 Carnivore Diet: Focus on meats and protein-heavy meals.");
    }
    if (diets.includes("Calorie Deficit")) {
        dietPlan.push("📉 Calorie Deficit: Eat fewer calories than you burn to lose weight.");
    }
    if (diets.includes("Keto")) {
        dietPlan.push("🥑 Keto Diet: Low-carb, high-fat meals for energy and focus.");
    }
    if (diets.includes("Mediterranean")) {
        dietPlan.push("🍇 Mediterranean Diet: Lots of fruits, fish, and healthy oils.");
    }
    if (diets.includes("Paleo")) {
        dietPlan.push("🥩 Paleo Diet: Focus on lean meats, veggies, and nuts.");
    }
    if (diets.includes("High-Protein")) {
        dietPlan.push("💪 High-Protein Diet: Build muscle with lean meats & legumes.");
    }

    // Show "Avoid <allergy>" messages
    if (allergies.length > 0) {
        allergies.forEach((allergy) => {
            dietPlan.push(`🚫 Avoid ${allergy}`);
        });
    }

    // Hydration Recommendation
    let waterIntake = (weight * 0.035).toFixed(1); // 0.035L per kg body weight
    let hydrationMessage = `💧 You should drink at least ${waterIntake} liters of water per day!`;

    // Show the generated plan
    document.getElementById("plan").classList.remove("hidden");
    document.getElementById("workout-list").innerHTML = workoutPlan.map(item => `<li>${item}</li>`).join("");
    document.getElementById("diet-list").innerHTML = dietPlan.map(item => `<li>${item}</li>`).join("");
    document.getElementById("hydration").innerText = hydrationMessage;
}

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburgerIcon = document.getElementById("hamburgerIcon");

    navLinks.classList.toggle("show");

    // Optional: toggle between ☰ and ✖
    if (navLinks.classList.contains("show")) {
        hamburgerIcon.textContent = "✖";
    } else {
        hamburgerIcon.textContent = "☰";
    }
}
