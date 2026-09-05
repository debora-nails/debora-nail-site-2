/* =========================================================
   DÉBORA APARECIDA NAIL DESIGN
   APP.JS — versão limpa
   ========================================================= */

const SERVICES = [
  [
    "Alongamento Mold F1",
    135,
    "Alongamento construído com molde F1, com estrutura personalizada e acabamento elegante."
  ],
  [
    "Alongamento Fibra de Vidro",
    140,
    "Alongamento com fibra de vidro para um resultado delicado, estruturado e personalizado."
  ],
  [
    "Banho de Gel",
    80,
    "Aplicação de gel sobre a unha natural para reforçar a estrutura e proporcionar um acabamento bonito."
  ],
  [
    "Postiça Realista",
    35,
    "Unhas com visual natural e acabamento delicado, uma opção prática para o dia a dia."
  ],
  [
    "Soft Gel",
    40,
    "Alongamento com tips de gel, com resultado leve, uniforme e elegante."
  ],
  [
    "Manicure",
    24,
    "Cuidado das unhas das mãos, preparação, acabamento e esmaltação conforme escolha."
  ],
  [
    "Pedicure",
    24,
    "Cuidado das unhas dos pés, preparação, acabamento e esmaltação conforme escolha."
  ],
  [
    "Spa dos Pés",
    50,
    "Momento de cuidado e relaxamento para os pés, com pedicure incluso."
  ],
  [
    "Plástica dos Pés",
    65,
    "Cuidado especial para deixar os pés com aparência mais cuidada e sensação de maciez."
  ]
];


/* =========================================================
   FOTOS DOS SERVIÇOS
   ========================================================= */

const SERVICE_IMAGES = {
  0: [
    "images/mold-f1-1.jpeg",
    "images/mold-f1-2.jpeg"
  ],

  1: [
    "images/fibra-1.jpeg",
    "images/fibra-2.jpeg"
  ],

  2: [
    "images/banho-gel-1.jpeg",
    "images/banho-gel-2.jpeg"
  ],

  3: [
    "images/postica-1.jpeg",
    "images/postica-2.jpeg",
    "images/postica-3.jpeg"
  ],

  4: [
    "images/soft-gel-1.jpeg",
    "images/soft-gel-2.jpeg"
  ],

  6: [
    "images/pedicure-1.jpeg"
  ],

  8: [
    "images/plastica-pes-1.jpeg",
    "images/plastica-pes-2.jpeg"
  ]
};


/* =========================================================
   SUPABASE
   ========================================================= */

const supabaseLib = window.supabase || null;
const cfg = window.SUPABASE_CONFIG || {};

let supabase = null;

if (
  supabaseLib &&
  typeof supabaseLib.createClient === "function" &&
  cfg.url &&
  cfg.publishableKey &&
  !cfg.publishableKey.includes("COLE_AQUI")
) {
  supabase = supabaseLib.createClient(
    cfg.url,
    cfg.publishableKey
  );
}


/* =========================================================
   ESTADO
   ========================================================= */

let currentUser = null;
let currentClient = null;


/* =========================================================
   ELEMENTOS
   ========================================================= */

const servicesGrid =
  document.getElementById("servicesGrid");

const galleryGrid =
  document.getElementById("galleryGrid");

const bookingModal =
  document.getElementById("bookingModal");

const loginModal =
  document.getElementById("loginModal");

const registerModal =
  document.getElementById("registerModal");

const vipModal =
  document.getElementById("vipModal");

const adminModal =
  document.getElementById("adminModal");


/* =========================================================
   SERVIÇOS
   ========================================================= */

function renderServices() {

  if (!servicesGrid) return;

  servicesGrid.innerHTML = SERVICES.map(
    (service, index) => {

      const name = service[0];
      const price = service[1];
      const description = service[2];

      const photos =
        SERVICE_IMAGES[index] || [];

      const photosHTML =
        photos.length
          ? `
            <div class="service-images">
              ${photos.map(
                photo => `
                  <img
                    src="${photo}"
                    alt="${name}"
                    loading="lazy"
                  >
                `
              ).join("")}
            </div>
          `
          : "";

      return `
        <article class="service-card">

          ${photosHTML}

          <div class="service-content">

            <p class="service-number">
              ${String(index + 1).padStart(2, "0")}
            </p>

            <h3>${name}</h3>

            <p class="service-description">
              ${description}
            </p>

            <div class="service-bottom">

              <strong>
                R$ ${price.toFixed(2).replace(".", ",")}
              </strong>

              <button
                class="btn btn-primary service-book"
                data-service="${index}"
              >
                Agendar
              </button>

            </div>

          </div>

        </article>
      `;
    }
  ).join("");

  document
    .querySelectorAll(".service-book")
    .forEach(button => {

      button.addEventListener("click", () => {

        const index =
          Number(button.dataset.service);

        openBooking(index);

      });

    });
}


/* =========================================================
   GALERIA
   ========================================================= */

const STATIC_GALLERY = [
  ["Fibra de Vidro", "images/fibra-1.jpeg"],
  ["Fibra de Vidro", "images/fibra-2.jpeg"],

  ["Mold F1", "images/mold-f1-1.jpeg"],
  ["Mold F1", "images/mold-f1-2.jpeg"],

  ["Postiça Realista", "images/postica-1.jpeg"],
  ["Postiça Realista", "images/postica-2.jpeg"],
  ["Postiça Realista", "images/postica-3.jpeg"],

  ["Pedicure", "images/pedicure-1.jpeg"],

  ["Banho de Gel", "images/banho-gel-1.jpeg"],
  ["Banho de Gel", "images/banho-gel-2.jpeg"],

  ["Soft Gel", "images/soft-gel-1.jpeg"],
  ["Soft Gel", "images/soft-gel-2.jpeg"],

  ["Plástica dos Pés", "images/plastica-pes-1.jpeg"],
  ["Plástica dos Pés", "images/plastica-pes-2.jpeg"]
];


function renderGallery(extraPhotos = []) {

  if (!galleryGrid) return;

  const photos = [
    ...STATIC_GALLERY,
    ...extraPhotos
  ];

  galleryGrid.innerHTML = photos.map(
    item => {

      const title = item[0];
      const image = item[1];

      return `
        <figure class="gallery-item">

          <img
            src="${image}"
            alt="${title}"
            loading="lazy"
          >

          <figcaption>
            ${title}
          </figcaption>

        </figure>
      `;
    }
  ).join("");
}


/* =========================================================
   MODAIS
   ========================================================= */

function openModal(modal) {

  if (!modal) return;

  modal.classList.add("open");

  document.body.classList.add("modal-open");
}


function closeModal(modal) {

  if (!modal) return;

  modal.classList.remove("open");

  document.body.classList.remove("modal-open");
}


document
  .querySelectorAll("[data-close]")
  .forEach(button => {

    button.addEventListener("click", () => {

      const id =
        button.dataset.close;

      closeModal(
        document.getElementById(id)
      );

    });

  });


document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal(modal);
      }

    });

  });


/* =========================================================
   LOGIN / CADASTRO
   ========================================================= */

function openLogin() {
  closeModal(registerModal);
  openModal(loginModal);
}


function openRegister() {
  closeModal(loginModal);
  openModal(registerModal);
}


document
  .getElementById("openLogin")
  ?.addEventListener("click", openLogin);


document
  .getElementById("heroVip")
  ?.addEventListener("click", openLogin);


document
  .getElementById("vipLogin2")
  ?.addEventListener("click", openLogin);


document
  .getElementById("showRegister")
  ?.addEventListener("click", openRegister);


/* =========================================================
   MENSAGENS
   ========================================================= */

function message(element, text, success = false) {

  if (!element) return;

  element.textContent = text;

  element.className =
    "form-message " +
    (success ? "success" : "error");
}


/* =========================================================
   CADASTRO
   ========================================================= */

document
  .getElementById("registerForm")
  ?.addEventListener("submit", async event => {

    event.preventDefault();

    const name =
      document.getElementById("regName")?.value.trim();

    const phone =
      document.getElementById("regPhone")?.value.trim();

    const email =
      document.getElementById("regEmail")?.value.trim();

    const password =
      document.getElementById("regPassword")?.value;

    const result =
      document.getElementById("registerMessage");

    if (!supabase) {

      message(
        result,
        "O sistema ainda não está conectado ao Supabase."
      );

      return;
    }

    message(result, "Criando sua conta...");

    try {

      const { data, error } =
        await supabase.auth.signUp({

          email,
          password,

          options: {
            data: {
              nome: name,
              whatsapp: phone
            }
          }

        });

      if (error) {
        throw error;
      }

      if (data.user) {

        await createClientProfile(
          data.user,
          name,
          phone,
          email
        );

      }

      message(
        result,
        "Cadastro realizado! Agora você já pode entrar na Área VIP.",
        true
      );

      document
        .getElementById("registerForm")
        ?.reset();

    } catch (error) {

      message(
        result,
        error.message ||
        "Não foi possível criar sua conta."
      );

    }

  });


/* =========================================================
   CRIAR CLIENTE
   ========================================================= */

async function createClientProfile(
  user,
  name,
  phone,
  email
) {

  if (!supabase || !user) return null;

  const { data, error } =
    await supabase
      .from("Clientes")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

  if (error) {
    console.error(error);
  }

  if (data) {
    return data;
  }

  const { data: client, error: insertError } =
    await supabase
      .from("Clientes")
      .insert({

        Nome: name,
        whatsapp: phone,
        email: email,
        user_id: user.id

      })
      .select()
      .single();

  if (insertError) {

    console.error(
      "Erro ao criar cliente:",
      insertError
    );

    return null;
  }

  await supabase
    .from("vip_fidelidade")
    .insert({
      cliente_id: client.id,
      pontos: 0,
      beneficio_usado: false
    });

  return client;
}


/* =========================================================
   LOGIN
   ========================================================= */

document
  .getElementById("loginForm")
  ?.addEventListener("submit", async event => {

    event.preventDefault();

    const email =
      document.getElementById("loginEmail")?.value.trim();

    const password =
      document.getElementById("loginPassword")?.value;

    const result =
      document.getElementById("loginMessage");

    if (!supabase) {

      message(
        result,
        "O sistema ainda não está conectado ao Supabase."
      );

      return;
    }

    message(result, "Entrando...");

    try {

      const { data, error } =
        await supabase.auth.signInWithPassword({

          email,
          password

        });

      if (error) {
        throw error;
      }

      currentUser = data.user;

      await loadCurrentClient();

      message(
        result,
        "Login realizado com sucesso!",
        true
      );

      setTimeout(() => {

        closeModal(loginModal);

        openVIP();

      }, 500);

    } catch (error) {

      message(
        result,
        "E-mail ou senha incorretos."
      );

    }

  });


/* =========================================================
   CLIENTE ATUAL
   ========================================================= */

async function loadCurrentClient() {

  if (!supabase || !currentUser) {
    return null;
  }

  const { data, error } =
    await supabase
      .from("Clientes")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  currentClient = data;

  return data;
}


/* =========================================================
   AGENDAMENTO
   ========================================================= */

function openBooking(serviceIndex = 0) {

  const serviceSelect =
    document.getElementById("bookingService");

  if (serviceSelect) {

    serviceSelect.innerHTML =
      SERVICES.map(
        (service, index) => `
          <option
            value="${index}"
            ${index === serviceIndex ? "selected" : ""}
          >
            ${service[0]} — R$ ${service[1]
              .toFixed(2)
              .replace(".", ",")}
          </option>
        `
      ).join("");

  }

  if (currentClient) {

    const nameInput =
      document.getElementById("bookingName");

    const phoneInput =
      document.getElementById("bookingPhone");

    if (nameInput) {
      nameInput.value =
        currentClient.Nome ||
        currentClient.nome ||
        "";
    }

    if (phoneInput) {
      phoneInput.value =
        currentClient.whatsapp || "";
    }

  }

  openModal(bookingModal);

}


document
  .getElementById("heroBook")
  ?.addEventListener(
    "click",
    () => openBooking(0)
  );


/* =========================================================
   DATA MÍNIMA
   ========================================================= */

const bookingDate =
  document.getElementById("bookingDate");

if (bookingDate) {

  const today =
    new Date().toISOString().split("T")[0];

  bookingDate.min = today;

}


/* =========================================================
   CARREGAR HORÁRIOS
   ========================================================= */

async function loadBookingTimes() {

  const date =
    document.getElementById("bookingDate")?.value;

  const select =
    document.getElementById("bookingTime");

  if (!date || !select) return;

  select.innerHTML =
    `<option value="">Carregando...</option>`;

  if (!supabase) {

    select.innerHTML =
      `<option value="">Sistema indisponível</option>`;

    return;
  }

  try {

    const { data, error } =
      await supabase
        .from("horarios")
        .select("*")
        .eq("data", date)
        .eq("disponivel", true)
        .order("horario");

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {

      select.innerHTML =
        `<option value="">Nenhum horário disponível</option>`;

      return;
    }

    select.innerHTML =
      `<option value="">Escolha o horário</option>` +
      data.map(
        item => `
          <option value="${item.horario}">
            ${String(item.horario).slice(0, 5)}
          </option>
        `
      ).join("");

  } catch (error) {

    console.error(error);

    select.innerHTML =
      `<option value="">Não foi possível carregar os horários</option>`;

  }

}


bookingDate
  ?.addEventListener(
    "change",
    loadBookingTimes
  );


/* =========================================================
   SALVAR AGENDAMENTO
   ========================================================= */

document
  .getElementById("bookingForm")
  ?.addEventListener("submit", async event => {

    event.preventDefault();

    const result =
      document.getElementById("bookingMessage");

    if (!supabase) {

      message(
        result,
        "Sistema ainda não conectado."
      );

      return;
    }

    if (!currentUser) {

      message(
        result,
        "Entre na sua Área VIP antes de agendar."
      );

      return;
    }

    if (!currentClient) {
      await loadCurrentClient();
    }

    if (!currentClient) {

      message(
        result,
        "Não encontramos seu cadastro."
      );

      return;
    }

    const serviceIndex =
      Number(
        document.getElementById(
          "bookingService"
        )?.value
      );

    const date =
      document.getElementById(
        "bookingDate"
      )?.value;

    const time =
      document.getElementById(
        "bookingTime"
      )?.value;

    if (!date || !time) {

      message(
        result,
        "Escolha a data e o horário."
      );

      return;
    }

    const service =
      SERVICES[serviceIndex];

    message(
      result,
      "Confirmando seu agendamento..."
    );

    try {

      const { error } =
        await supabase
          .from("agendamentos")
          .insert({

            cliente_id: currentClient.id,
            servico: service[0],
            data: date,
            horario: time,
            status: "confirmado"

          });

      if (error) {

        if (
          error.code === "23505"
        ) {

          throw new Error(
            "Esse horário acabou de ser ocupado. Escolha outro."
          );

        }

        throw error;
      }

      message(
        result,
        "Agendamento confirmado! 💗",
        true
      );

      document
        .getElementById("bookingForm")
        ?.reset();

      setTimeout(() => {
        closeModal(bookingModal);
      }, 1200);

    } catch (error) {

      message(
        result,
        error.message ||
        "Não foi possível realizar o agendamento."
      );

    }

  });


/* =========================================================
   ÁREA VIP
   ========================================================= */

async function openVIP() {

  if (!currentUser) {

    openLogin();

    return;
  }

  if (!currentClient) {
    await loadCurrentClient();
  }

  if (!currentClient) {
    openLogin();
    return;
  }

  const welcome =
    document.getElementById("vipWelcome");

  if (welcome) {

    const name =
      currentClient.Nome ||
      currentClient.nome ||
      "Cliente";

    welcome.textContent =
      `Olá, ${name}! 💗`;

  }

  await loadVIP();

  openModal(vipModal);

}


document
  .getElementById("logoutBtn")
  ?.addEventListener(
    "click",
    async () => {

      if (supabase) {
        await supabase.auth.signOut();
      }

      currentUser = null;
      currentClient = null;

      closeModal(vipModal);

    }
  );


/* =========================================================
   VIP / PONTOS
   ========================================================= */

async function loadVIP() {

  if (!supabase || !currentClient) {
    return;
  }

  const { data, error } =
    await supabase
      .from("vip_fidelidade")
      .select("*")
      .eq("cliente_id", currentClient.id)
      .maybeSingle();

  if (error) {

    console.error(error);

    return;
  }

  const points =
    data?.pontos || 0;

  const pointsElement =
    document.getElementById("vipPoints");

  if (pointsElement) {
    pointsElement.textContent = points;
  }

  const benefit =
    document.getElementById("vipBenefit");

  if (benefit) {

    if (points >= 10) {

      benefit.textContent =
        "Você conquistou 60% de desconto! 💗";

    } else {

      benefit.textContent =
        `Você tem ${points} de 10 pontos. Continue acumulando!`;

    }

  }

  renderDots(
    document.getElementById("vipDots"),
    points
  );

}


/* =========================================================
   PONTOS VISUAIS
   ========================================================= */

function renderDots(container, points) {

  if (!container) return;

  container.innerHTML =
    Array.from(
      { length: 10 },
      (_, index) => `
        <span class="${index < points ? "filled" : ""}">
          ${index < points ? "♥" : "♡"}
        </span>
      `
    ).join("");

}


function renderDemoDots() {

  const container =
    document.getElementById("demoDots");

  const text =
    document.getElementById("demoPointText");

  if (!container) return;

  const points = 0;

  renderDots(container, points);

  if (text) {
    text.textContent =
      "0 de 10 pontos";
  }

}


/* =========================================================
   AUTENTICAÇÃO AUTOMÁTICA
   ========================================================= */

async function initializeAuth() {

  if (!supabase) {

    renderServices();
    renderGallery();
    renderDemoDots();

    return;
  }

  try {

    const { data } =
      await supabase.auth.getSession();

    currentUser =
      data?.session?.user || null;

    if (currentUser) {
      await loadCurrentClient();
    }

  } catch (error) {

    console.error(error);

  }

  renderServices();
  renderGallery();
  renderDemoDots();

}


if (supabase) {

  supabase.auth.onAuthStateChange(
    async (event, session) => {

      currentUser =
        session?.user || null;

      if (currentUser) {
        await loadCurrentClient();
      } else {
        currentClient = null;
      }

    }
  );

}


/* =========================================================
   MENU / NAVEGAÇÃO
   ========================================================= */

document
  .querySelectorAll("nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll("nav a")
          .forEach(item =>
            item.classList.remove("active")
          );

        link.classList.add("active");

      }
    );

  });


/* =========================================================
   ESC
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") return;

    document
      .querySelectorAll(".modal.open")
      .forEach(modal => {
        closeModal(modal);
      });

  }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

initializeAuth();
