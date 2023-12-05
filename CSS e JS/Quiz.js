        // Inicializa variáveis para controlar o progresso do quiz
        let currentQuestionIndex = 0;
        let correctAnswers = 0;

        // Função para exibir a próxima pergunta
        function showNextQuestion() {
            if (currentQuestionIndex < questions.length) {
                const currentQuestion = questions[currentQuestionIndex];

                // Oculta o feedback-container
                document.getElementById("feedback-container").style.display = "none";

                // Mostra o question-container
                document.getElementById("question-container").style.display = "block";

                document.getElementById("question-text").textContent = currentQuestion.question;

                for (let i = 0; i < currentQuestion.options.length; i++) {
                    const optionButton = document.getElementById(`option${i + 1}`);
                    optionButton.textContent = currentQuestion.options[i];
                    optionButton.addEventListener("click", checkAnswer);
                }
				
                // Verifica se está na última pergunta e atualiza o texto do botão
                if (currentQuestionIndex === questions.length - 1) {
                    const nextButton = document.getElementById("next-button");
                    nextButton.textContent = "Mostrar Resultado";
                }
            } else {
                // Se todas as perguntas foram respondidas, exibe a contagem de respostas corretas
                document.getElementById("question-container").style.display = "none";
                document.getElementById("result").textContent = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;
            }
        }

        // Função para verificar a resposta selecionada pelo usuário
		function checkAnswer(event) {
			const selectedAnswer = event.target.textContent;
			const currentQuestion = questions[currentQuestionIndex];

			// Verifica se a resposta selecionada é correta e troca a imagem de fundo
			if (selectedAnswer === currentQuestion.answer) {
				correctAnswers++;
				document.body.classList.add("background1");
				document.body.classList.remove("background2");
				document.body.classList.remove("background3");
			}
			else {
				document.body.classList.add("background2");
				document.body.classList.remove("background1");
				document.body.classList.remove("background3");
			}
	
			// Obtém o texto informativo da pergunta atual
			const infoText = currentQuestion.info;
			const info2Text = currentQuestion.info2;
			
			// Atualiza o feedback-text com uma mensagem informativa (correto/incorreto) e o texto informativo
			const feedbackText = document.getElementById("feedback-text");
			feedbackText.innerHTML = selectedAnswer === currentQuestion.answer
				? `<span class="correct">Resposta Correta!</span><br><span class="info">${infoText}</span>`
				: `<span class="incorrect">Resposta Incorreta.</span><br><span class="info">${info2Text}</span>`;

			currentQuestionIndex++;

			// Oculta o question-container
			document.getElementById("question-container").style.display = "none";

			// Mostra o feedback-container
			const feedbackContainer = document.getElementById("feedback-container");
			feedbackContainer.style.display = "block";

			// Atualiza o botão de "Próxima Pergunta" para continuar ou mostrar resultado
			const nextButton = document.getElementById("next-button");
			if (currentQuestionIndex === questions.length) {
				nextButton.textContent = "Mostrar Resultado";
				nextButton.addEventListener("click", function() {
				showResult();
				});
			} else {
				nextButton.textContent = "Próxima Pergunta";
				nextButton.addEventListener("click", showNextQuestion);
				nextButton.addEventListener("click", function() {
					document.body.classList.remove("background2");
					document.body.classList.remove("background1");
					});
			}
		}

        // Função para mostrar o resultado final
        function showResult() {
            document.getElementById("feedback-container").style.display = "none";
			document.getElementById("result2").textContent = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;
			document.getElementById("restart").style.display = "block";
			
			//muda a imagem de fundo e dá uma resposta diferenciada
            if (correctAnswers === 10){
				document.getElementById("result").textContent = `Meus Parabéns, outro quiz gabaritado!`;
				document.body.classList.add("background3");
				document.body.classList.remove("background1");
				document.body.classList.remove("background2");
			}
			else if (correctAnswers >= 8 && correctAnswers < 10){
				document.getElementById("result").textContent = `Caramba, mandou ver!`;
				document.body.classList.add("background1");
				document.body.classList.remove("background2");
				document.body.classList.remove("background3");
			}
			else if (correctAnswers >= 6 && correctAnswers < 8){
				document.getElementById("result").textContent = `Nada mal!`;
				document.body.classList.add("background1");
				document.body.classList.remove("background2");
				document.body.classList.remove("background3");
			}
			else if (correctAnswers >= 4 && correctAnswers < 6){
				document.getElementById("result").textContent = `Foi meio nhé.`;
				document.body.classList.remove("background1");
				document.body.classList.remove("background2");
				document.body.classList.remove("background3");
			}
			else if (correctAnswers > 0 && correctAnswers < 4){
				document.getElementById("result").textContent = `Poxa vida, cara.`;
				document.body.classList.add("background2");
				document.body.classList.remove("background1");
				document.body.classList.remove("background3");
			}
			else if (correctAnswers === 0){
				document.getElementById("result").textContent = `Vou nem falar nada!`;
				document.body.classList.add("background2");
				document.body.classList.remove("background1");
				document.body.classList.remove("background3");
			}
		}
		
        // Função para limpar os botões de opção
        function clearOptionButtons() {
            for (let i = 0; i < 4; i++) {
                const optionButton = document.getElementById(`option${i + 1}`);
                optionButton.textContent = "";
                optionButton.removeEventListener("click", checkAnswer);
            }
        }
		
		//Faz o quiz começar
		const startButton = document.getElementById("start");
		startButton.addEventListener("click", function() {
					showNextQuestion();
					document.getElementById("introduction").style.display = "none";
					document.getElementById("question-container").style.display = "block";
					});
		
		//Faz as imagens de fundo serem carregadas antes, para não travar.
		const imagePreloader1 = new Image();
		const imagePreloader2 = new Image();
		const imagePreloader3 = new Image();
		const imagePath1 = 'Images/Green_Background.jpg';
		const imagePath2 = 'Images/Red_Background.jpg';
		const imagePath3 = 'Images/Pink_Background.jpg';
		imagePreloader1.src = imagePath1;
		imagePreloader2.src = imagePath2;
		imagePreloader3.src = imagePath3;
		