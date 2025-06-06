// Aguarda a página carregar
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada - iniciando scripts")

  // ===== MENU HAMBÚRGUER =====
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("navMenu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // ===== SLIDESHOW =====
  let currentSlideIndex = 0
  const slides = document.querySelectorAll(".slide")
  const indicators = document.querySelectorAll(".indicator")

  function showSlide(index) {
    if (slides.length > 0) {
      slides.forEach((slide) => slide.classList.remove("active"))
      indicators.forEach((indicator) => indicator.classList.remove("active"))

      slides[index].classList.add("active")
      if (indicators[index]) {
        indicators[index].classList.add("active")
      }
    }
  }

  window.changeSlide = (direction) => {
    if (slides.length === 0) return

    currentSlideIndex += direction

    if (currentSlideIndex >= slides.length) {
      currentSlideIndex = 0
    } else if (currentSlideIndex < 0) {
      currentSlideIndex = slides.length - 1
    }

    showSlide(currentSlideIndex)
  }

  window.currentSlide = (index) => {
    if (slides.length === 0) return
    currentSlideIndex = index - 1
    showSlide(currentSlideIndex)
  }

  // ===== QUIZ COM BOTÃO VERIFICAR =====
  console.log("Configurando quiz com botão verificar...")

  // Respostas corretas (índice da opção correta)
  const correctAnswers = {
    q1: "1", // Segunda opção - Entupimento de bueiros
    q2: "2", // Terceira opção - 1942
    q3: "1", // Segunda opção - Sensores
    q4: "2", // Terceira opção - Canal se abre
    q5: "1", // Segunda opção - Triturar dejetos sólidos
  }

  // Botão verificar
  const verifyButton = document.getElementById("verifyQuiz")
  const correctAnswersSection = document.getElementById("correctAnswersSection")

  if (verifyButton) {
    verifyButton.addEventListener("click", () => {
      console.log("Verificando respostas...")

      // Verificar cada pergunta
      for (let i = 1; i <= 5; i++) {
        const questionName = `q${i}`
        const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`)
        const allOptions = document.querySelectorAll(`input[name="${questionName}"]`)

        // Resetar todas as opções para o estilo padrão
        allOptions.forEach((option) => {
          option.parentElement.classList.remove("correct", "incorrect")
        })

        // Se nenhuma opção foi selecionada, pular
        if (!selectedOption) {
          console.log(`Pergunta ${i}: Nenhuma opção selecionada`)
          continue
        }

        const selectedValue = selectedOption.value
        const correctValue = correctAnswers[questionName]

        console.log(`Pergunta ${i}: Selecionado ${selectedValue}, Correto ${correctValue}`)

        // Marcar a opção selecionada como correta ou incorreta
        if (selectedValue === correctValue) {
          // Resposta correta - marcar em verde
          selectedOption.parentElement.classList.add("correct")
        } else {
          // Resposta incorreta - marcar em vermelho
          selectedOption.parentElement.classList.add("incorrect")

          // Marcar a resposta correta em verde
          allOptions.forEach((option) => {
            if (option.value === correctValue) {
              option.parentElement.classList.add("correct")
            }
          })
        }
      }

      // Exibir seção de respostas corretas
      if (correctAnswersSection) {
        correctAnswersSection.style.display = "block"

        // Scroll suave até a seção de respostas
        setTimeout(() => {
          correctAnswersSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 300)
      }
    })
  } else {
    console.error("Botão verificar não encontrado!")
  }

  // ===== VALIDAÇÃO DE FORMULÁRIO =====
  const form = document.getElementById("contactForm")

  if (form) {
    function validateField(fieldId, errorId, validationFn, errorMessage) {
      const field = document.getElementById(fieldId)
      const errorElement = document.getElementById(errorId)

      if (!field || !errorElement) return true

      if (!validationFn(field.value)) {
        errorElement.textContent = errorMessage
        field.style.borderColor = "#e74c3c"
        return false
      } else {
        errorElement.textContent = ""
        field.style.borderColor = "#27ae60"
        return true
      }
    }

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true

      // Validar nome
      isValid &= validateField(
        "name",
        "nameError",
        (value) => value.trim().length >= 2,
        "Nome deve ter pelo menos 2 caracteres",
      )

      // Validar email
      isValid &= validateField("email", "emailError", validateEmail, "Por favor, insira um email válido")

      // Validar assunto
      isValid &= validateField("subject", "subjectError", (value) => value !== "", "Por favor, selecione um assunto")

      // Validar mensagem
      isValid &= validateField(
        "message",
        "messageError",
        (value) => value.trim().length >= 10,
        "Mensagem deve ter pelo menos 10 caracteres",
      )

      if (isValid) {
        alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
        form.reset()
        // Resetar cores dos campos
        const fields = form.querySelectorAll("input, select, textarea")
        fields.forEach((field) => (field.style.borderColor = "#ddd"))
      }
    })
  }

  // ===== PERSONALIZAÇÃO DE TEMAS =====
  const theme1 = document.getElementById("theme1")
  const theme2 = document.getElementById("theme2")
  const theme3 = document.getElementById("theme3")

  if (theme1) {
    theme1.addEventListener("click", () => {
      document.body.className = ""
    })
  }

  if (theme2) {
    theme2.addEventListener("click", () => {
      document.body.className = "theme-green"
    })
  }

  if (theme3) {
    theme3.addEventListener("click", () => {
      document.body.className = "theme-purple"
    })
  }

  // ===== SCROLL SUAVE =====
  const links = document.querySelectorAll('nav a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // ===== BOTÃO VOLTAR AO TOPO =====
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = "inline-block"
      } else {
        backToTopBtn.style.display = "none"
      }
    })

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // ===== EFEITOS HOVER =====
  const items = document.querySelectorAll(".item")

  items.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  console.log("Todos os scripts carregados!")
})

