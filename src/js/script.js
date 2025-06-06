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