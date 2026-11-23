const SUPABASE_URL = "https://rwrjeusailgalrecolwh.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_bgX361HcGcCSQXYApHf9rg_ABpXYSTw";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
const products = {
    "beyond-candles": {
        title: "ما وراء الشموع",
        icon: "📘",
        status: "قريبًا",
        description: "اكتشف عالم التداول من منظور أعمق.",
        details: "مشروع تعليمي متخصص في فهم الأسواق وقراءة حركة الأسعار. نعمل حاليًا على تطوير النسخة النهائية."
    },

    "digital-tools": {
        title: "Digital Products",
        icon: "✦",
        status: "قريبًا",
        description: "أدوات رقمية لأفكار أكبر.",
        details: "نعمل على تطوير مجموعة من المنتجات والأدوات الرقمية التي تجمع بين الابتكار وسهولة الاستخدام."
    },

    "coming-next": {
        title: "What's Next?",
        icon: "Z",
        status: "قريبًا",
        description: "المزيد قادم من ZENOVA.",
        details: "لدينا أفكار ومشروعات جديدة نعمل على تحويلها إلى منتجات رقمية مميزة."
    }
};

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const product = products[productId];

if (product) {
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-name").textContent = product.title;
    document.getElementById("product-icon").textContent = product.icon;
    document.getElementById("product-status").textContent = product.status;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-details").textContent = product.details;

    document.title = product.title + " | ZENOVA";
} else {
    document.getElementById("product-title").textContent = "المنتج غير موجود";
    document.getElementById("product-name").textContent = "لم يتم العثور على المنتج";
    document.getElementById("product-details").textContent = "تأكد من رابط المنتج وحاول مرة أخرى.";
}
// BOOK REVIEW STAR RATING

// BOOK REVIEW STAR RATING

let selectedRating = 0;

const stars = document.querySelectorAll("#review-stars button");

stars.forEach((star) => {
    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.rating);

        stars.forEach((item) => {
            item.classList.toggle(
                "active",
                Number(item.dataset.rating) <= selectedRating
            );
        });
    });
});

const submitReview = document.getElementById("submit-review");
const reviewComment = document.getElementById("review-comment");
const reviewMessage = document.getElementById("review-message");

async function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    const averageRating = document.getElementById("average-rating");
    const reviewsCount = document.getElementById("reviews-count");

    reviewsList.textContent = "جاري تحميل التقييمات...";

    const { data, error } = await supabaseClient
        .from("book_reviews")
        .select("rating, comment, created_at")
        .eq("product_slug", "beyond-candles")
        .order("created_at", { ascending: false });

    if (error) {
        reviewsList.textContent = "تعذر تحميل التقييمات.";
        console.error(error);
        return;
    }

    reviewsList.replaceChildren();

    const totalReviews = data.length;

    if (totalReviews === 0) {
        averageRating.textContent = "0.0 / 5 ⭐";
        reviewsCount.textContent = "0 تقييم";
        reviewsList.textContent = "لا توجد تقييمات حتى الآن.";
        return;
    }

    const totalRating = data.reduce((sum, review) => {
        return sum + review.rating;
    }, 0);

    const average = (totalRating / totalReviews).toFixed(1);

    averageRating.textContent = `${average} / 5 ⭐`;
    reviewsCount.textContent = `${totalReviews} تقييم`;

    data.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-item";

        const rating = document.createElement("h3");
        rating.textContent =
            "★".repeat(review.rating) +
            "☆".repeat(5 - review.rating);

const comment = document.createElement("p");
comment.textContent = review.comment;

const date = document.createElement("small");
date.textContent = new Date(review.created_at).toLocaleDateString("ar-EG");

card.append(rating, comment, date);
        reviewsList.appendChild(card);
    });
}
submitReview.addEventListener("click", async () => {
    const comment = reviewComment.value.trim();

    if (selectedRating === 0) {
        reviewMessage.textContent = "من فضلك اختر تقييمًا بالنجوم.";
        return;
    }

    if (comment.length < 5 || comment.length > 1000) {
        reviewMessage.textContent = "التعليق يجب أن يكون بين 5 و1000 حرف.";
        return;
    }

    submitReview.disabled = true;
    reviewMessage.textContent = "جاري إرسال تقييمك...";

const turnstileToken = window.turnstile?.getResponse();

if (!turnstileToken) {
    reviewMessage.textContent = "من فضلك أكمل التحقق من الحماية أولًا.";
    submitReview.disabled = false;
    return;
}

const { error } = await supabaseClient.functions.invoke(
    "rapid-action",
    {
        body: {
            rating: selectedRating,
            comment: comment,
            turnstileToken: turnstileToken
        }
    }
);
    submitReview.disabled = false;

    if (error) {
        reviewMessage.textContent = "حدث خطأ أثناء إرسال التقييم.";
        console.error(error);
        return;
    }

    reviewMessage.textContent = "تم إرسال تقييمك بنجاح! ❤️";
    reviewComment.value = "";
    selectedRating = 0;

    stars.forEach((star) => star.classList.remove("active"));
if (window.turnstile) {
    window.turnstile.reset();
}
    await loadReviews();
});

loadReviews();
