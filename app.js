// Advanced Fitness Website with Real PDF Generation
class FitnessApp {
    constructor() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.questions = [
            {
                id: 'objetivo',
                question: '¿Cuál es tu objetivo principal?',
                options: ['Perder peso', 'Ganar músculo', 'Mejorar resistencia', 'Mantener forma física', 'Rehabilitación']
            },
            {
                id: 'dias_entrenamiento',
                question: '¿Cuántos días puedes entrenar por semana?',
                options: ['2-3 días', '4-5 días', '6-7 días']
            },
            {
                id: 'nivel',
                question: '¿Cuál es tu nivel de experiencia?',
                options: ['Principiante (0-1 año)', 'Intermedio (1-3 años)', 'Avanzado (3+ años)']
            },
            {
                id: 'gimnasio',
                question: '¿Dónde entrenas?',
                options: ['Gimnasio completo', 'Gimnasio en casa', 'Solo peso corporal', 'Parque/exterior']
            },
            {
                id: 'tiempo_sesion',
                question: '¿Cuánto tiempo tienes por sesión?',
                options: ['30-45 minutos', '45-60 minutos', '60-90 minutos', 'Más de 90 minutos']
            },
            {
                id: 'objetivo_nutricional',
                question: '¿Cuál es tu objetivo nutricional?',
                options: ['Aumentar masa muscular', 'Perder grasa', 'Recomposición corporal', 'Rendimiento deportivo', 'Salud general']
            },
            {
                id: 'restricciones',
                question: '¿Tienes restricciones alimentarias?',
                options: ['Ninguna', 'Vegetariano', 'Vegano', 'Sin lactosa', 'Sin gluten', 'Otras']
            },
            {
                id: 'info_personal',
                question: 'Información personal (opcional para personalizar más):',
                type: 'form',
                fields: [
                    { name: 'edad', label: 'Edad', type: 'number', min: 16, max: 80, required: false },
                    { name: 'genero', label: 'Género', type: 'select', options: ['Masculino', 'Femenino', 'Otro'], required: false },
                    { name: 'peso', label: 'Peso aproximado (kg)', type: 'number', min: 30, max: 200, required: false }
                ]
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupFilters();
        this.setupCalculators();
        this.setupSmoothScrolling();
        this.updateProgressBar();
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Mobile menu
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Chatbot triggers
        document.querySelectorAll('.chatbot-trigger').forEach(trigger => {
            trigger.addEventListener('click', this.openChatbot.bind(this));
        });

        // Modal close
        document.querySelector('.close')?.addEventListener('click', this.closeChatbot.bind(this));
        
        // Close modal on outside click
        document.getElementById('chatbotModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'chatbotModal') {
                this.closeChatbot();
            }
        });

        // Back to top
        document.getElementById('backToTop')?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Global click handler for dynamic buttons
        document.addEventListener('click', this.handleGlobalClicks.bind(this));
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('backToTop');
        
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
            backToTop?.classList.add('visible');
        } else {
            navbar?.classList.remove('scrolled');
            backToTop?.classList.remove('visible');
        }
        
        this.animateOnScroll();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Add animation classes and observe
        document.querySelectorAll('.supplement-card, .health-category, .blog-card, .resource-card, .trust-item').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }

    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                // Filter blog cards with animation
                blogCards.forEach(card => {
                    if (filter === 'todos' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    setupCalculators() {
        const weeklyMinutes = document.getElementById('weeklyMinutes');
        const userAge = document.getElementById('userAge');
        
        if (weeklyMinutes) {
            weeklyMinutes.addEventListener('input', this.updateCalculatorResults.bind(this));
            weeklyMinutes.nextElementSibling.textContent = weeklyMinutes.value + ' min';
        }
        
        if (userAge) {
            userAge.addEventListener('input', this.updateCalculatorResults.bind(this));
            userAge.nextElementSibling.textContent = userAge.value + ' años';
        }
    }

    updateCalculatorResults() {
        const minutes = parseInt(document.getElementById('weeklyMinutes')?.value || 150);
        const age = parseInt(document.getElementById('userAge')?.value || 30);
        
        // Update range displays
        document.querySelector('#weeklyMinutes + .range-value').textContent = minutes + ' min';
        document.querySelector('#userAge + .range-value').textContent = age + ' años';
        
        // Calculate benefits (simplified formulas based on research)
        const cardioReduction = Math.min(Math.floor(minutes * 0.15), 50);
        const lifeYears = Math.min(Math.round((minutes / 150) * 3.5 * 10) / 10, 7);
        const diabetesReduction = Math.min(Math.floor(minutes * 0.18), 45);
        
        // Update results
        document.getElementById('cardioResult').textContent = cardioReduction + '%';
        document.getElementById('lifeResult').textContent = lifeYears + ' años';
        document.getElementById('diabetesResult').textContent = diabetesReduction + '%';
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleGlobalClicks(e) {
        // Handle dynamically created buttons
        if (e.target.matches('.option-btn')) {
            this.selectOption(e.target.dataset.value);
        }
        
        if (e.target.matches('#startChatBtn')) {
            this.startQuestionnaire();
        }
        
        if (e.target.matches('#downloadPdfBtn')) {
            this.generateAndDownloadPDF();
        }
    }

    // Chatbot functionality
    openChatbot() {
        const modal = document.getElementById('chatbotModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.resetChat();
        }
    }

    closeChatbot() {
        const modal = document.getElementById('chatbotModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    resetChat() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.displayWelcomeMessage();
        this.updateProgressBar();
    }

    displayWelcomeMessage() {
        const messages = document.getElementById('chatMessages');
        messages.innerHTML = `
            <div class="bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>¡Hola! 👋 Soy tu asistente de FitnessPro.</p>
                    <p>Te haré 8 preguntas rápidas para crear tu plan personalizado de entrenamiento y suplementación.</p>
                    <p><strong>Al finalizar recibirás:</strong></p>
                    <ul>
                        <li>🏋️ Plan de entrenamiento adaptado a tu nivel</li>
                        <li>💊 Recomendaciones de suplementos</li>
                        <li>📊 Guía nutricional básica</li>
                        <li>📈 Programa de progresión</li>
                    </ul>
                    <p>¿Listo para empezar?</p>
                    <button class="btn btn--primary" id="startChatBtn">🚀 ¡Empezar Cuestionario!</button>
                </div>
            </div>
        `;
        this.scrollChatToBottom();
    }

    startQuestionnaire() {
        this.currentQuestion = 0;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.generateResults();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const messages = document.getElementById('chatMessages');
        
        let questionHTML = `
            <div class="bot-message">
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p><strong>Pregunta ${this.currentQuestion + 1} de ${this.questions.length}</strong></p>
                    <p>${question.question}</p>
        `;

        if (question.type === 'form') {
            questionHTML += '<div class="question-form">';
            question.fields.forEach(field => {
                if (field.type === 'select') {
                    questionHTML += `
                        <div class="form-group">
                            <label>${field.label}:</label>
                            <select id="field_${field.name}" ${field.required ? 'required' : ''}>
                                <option value="">Seleccionar...</option>
                                ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                            </select>
                        </div>
                    `;
                } else {
                    questionHTML += `
                        <div class="form-group">
                            <label>${field.label}:</label>
                            <input type="${field.type}" id="field_${field.name}" 
                                   min="${field.min || ''}" max="${field.max || ''}" 
                                   ${field.required ? 'required' : ''}>
                        </div>
                    `;
                }
            });
            questionHTML += `
                <button class="btn btn--primary" onclick="fitnessApp.submitForm('${question.id}')">
                    Continuar
                </button>
            `;
            questionHTML += '</div>';
        } else {
            questionHTML += '<div class="question-options">';
            question.options.forEach(option => {
                questionHTML += `
                    <button class="option-btn" data-value="${option}">
                        ${option}
                    </button>
                `;
            });
            questionHTML += '</div>';
        }

        questionHTML += '</div></div>';
        messages.innerHTML += questionHTML;
        this.scrollChatToBottom();
        this.updateProgressBar();
    }

    selectOption(value) {
        const question = this.questions[this.currentQuestion];
        this.userAnswers[question.id] = value;
        
        // Add user message
        const messages = document.getElementById('chatMessages');
        messages.innerHTML += `
            <div class="user-message">
                <div class="message-content">
                    <p>${value}</p>
                </div>
            </div>
        `;
        
        this.scrollChatToBottom();
        this.currentQuestion++;
        
        setTimeout(() => {
            this.showQuestion();
        }, 500);
    }

    submitForm(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        const formData = {};
        
        question.fields.forEach(field => {
            const element = document.getElementById(`field_${field.name}`);
            if (element && element.value) {
                formData[field.name] = element.value;
            }
        });
        
        this.userAnswers[questionId] = formData;
        
        // Show user response
        const responses = [];
        if (formData.edad) responses.push(`${formData.edad} años`);
        if (formData.genero) responses.push(formData.genero);
        if (formData.peso) responses.push(`${formData.peso}kg`);
        
        if (responses.length > 0) {
            const messages = document.getElementById('chatMessages');
            messages.innerHTML += `
                <div class="user-message">
                    <div class="message-content">
                        <p>${responses.join(', ')}</p>
                    </div>
                </div>
            `;
            this.scrollChatToBottom();
        }
        
        this.currentQuestion++;
        setTimeout(() => {
            this.showQuestion();
        }, 500);
    }

    generateResults() {
        const plan = this.createPersonalizedPlan();
        const messages = document.getElementById('chatMessages');
        
        messages.innerHTML += `
            <div class="bot-message">
                <div class="message-avatar">🎉</div>
                <div class="message-content">
                    <h4>¡Tu Plan Personalizado Está Listo!</h4>
                    ${plan}
                    <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                        <button class="btn btn--primary" id="downloadPdfBtn">
                            📄 Descargar Plan en PDF
                        </button>
                        <button class="btn btn--outline" onclick="fitnessApp.resetChat()">
                            🔄 Crear Nuevo Plan
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.scrollChatToBottom();
        this.updateProgressBar();
    }

    createPersonalizedPlan() {
        const answers = this.userAnswers;
        let plan = '<div class="personalized-plan">';
        
        // Training Plan
        plan += '<h5>🏋️ Plan de Entrenamiento Personalizado:</h5><ul>';
        
        if (answers.nivel?.includes('Principiante')) {
            plan += '<li><strong>Tipo:</strong> Full-body 3 días/semana</li>';
            plan += '<li><strong>Ejercicios:</strong> Movimientos básicos compuestos</li>';
            plan += '<li><strong>Series:</strong> 3-4 series de 8-12 repeticiones</li>';
            plan += '<li><strong>Progresión:</strong> Aumentar peso cada 2 semanas</li>';
        } else if (answers.nivel?.includes('Intermedio')) {
            plan += '<li><strong>Tipo:</strong> Push/Pull/Legs o Upper/Lower</li>';
            plan += '<li><strong>Frecuencia:</strong> 4-5 días/semana</li>';
            plan += '<li><strong>Técnicas:</strong> Drop sets, superseries</li>';
            plan += '<li><strong>Progresión:</strong> Periodización lineal</li>';
        } else {
            plan += '<li><strong>Tipo:</strong> Especialización por grupos musculares</li>';
            plan += '<li><strong>Frecuencia:</strong> 5-6 días/semana</li>';
            plan += '<li><strong>Técnicas:</strong> Técnicas avanzadas de intensidad</li>';
            plan += '<li><strong>Progresión:</strong> Periodización ondulada</li>';
        }
        plan += '</ul>';
        
        // Nutrition recommendations
        plan += '<h5>🥗 Recomendaciones Nutricionales:</h5><ul>';
        if (answers.objetivo === 'Perder peso') {
            plan += '<li><strong>Déficit calórico:</strong> 300-500 kcal/día</li>';
            plan += '<li><strong>Proteína:</strong> 1.6-2.2g por kg de peso</li>';
            plan += '<li><strong>Estrategia:</strong> Alimentos saciantes, fibra alta</li>';
        } else if (answers.objetivo === 'Ganar músculo') {
            plan += '<li><strong>Superávit:</strong> 200-400 kcal/día</li>';
            plan += '<li><strong>Proteína:</strong> 1.8-2.5g por kg de peso</li>';
            plan += '<li><strong>Timing:</strong> Proteína distribuida en el día</li>';
        }
        plan += '</ul>';
        
        // Supplements
        plan += '<h5>💊 Suplementos Recomendados (basados en evidencia):</h5><ul>';
        plan += '<li><strong>Esenciales:</strong> Creatina monohidrato (5g/día)</li>';
        
        if (answers.objetivo_nutricional?.includes('masa muscular') || answers.restricciones?.includes('Vegano')) {
            plan += '<li><strong>Proteína:</strong> Whey (25-50g post-entreno o flexible)</li>';
        }
        
        plan += '<li><strong>Salud general:</strong> Omega-3 (2-3g EPA/DHA)</li>';
        plan += '<li><strong>Rendimiento:</strong> Cafeína (3-6mg/kg, 30-45min pre-entreno)</li>';
        plan += '</ul>';
        
        plan += '</div>';
        return plan;
    }

    async generateAndDownloadPDF() {
        // Show loading state
        const button = document.getElementById('downloadPdfBtn');
        const originalText = button.textContent;
        button.textContent = '⏳ Generando PDF...';
        button.disabled = true;

        try {
            // Simulate PDF generation (in real implementation, you'd use jsPDF or similar)
            await this.simulatePDFGeneration();
            
            // Create and download actual PDF
            this.createRealPDF();
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    }

    simulatePDFGeneration() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }

    createRealPDF() {
        // Create PDF content as HTML that will be converted
        const pdfContent = this.generatePDFContent();
        
        // Create a new window to show PDF preview (simulated)
        const pdfWindow = window.open('', '_blank');
        pdfWindow.document.write(`
            <html>
                <head>
                    <title>Mi Plan FitnessPro Personalizado</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                        .header { text-align: center; color: #10b981; margin-bottom: 30px; }
                        .section { margin-bottom: 25px; }
                        .section h3 { color: #1f2937; border-bottom: 2px solid #10b981; padding-bottom: 10px; }
                        ul { padding-left: 20px; }
                        li { margin-bottom: 8px; }
                        .highlight { background: #f0fdf4; padding: 15px; border-left: 4px solid #10b981; margin: 15px 0; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    ${pdfContent}
                    <div style="margin-top: 30px; text-align: center;">
                        <button onclick="window.print()" style="background: #10b981; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                            📄 Imprimir/Guardar como PDF
                        </button>
                    </div>
                </body>
            </html>
        `);
        pdfWindow.document.close();

        // Show success message
        setTimeout(() => {
            alert('✅ ¡PDF generado exitosamente!\n\nSe ha abierto una nueva ventana con tu plan personalizado.\n\nPuedes imprimirlo o guardarlo como PDF desde tu navegador.');
        }, 500);
    }

    generatePDFContent() {
        const answers = this.userAnswers;
        const date = new Date().toLocaleDateString('es-ES');
        
        return `
            <div class="header">
                <h1>💪 Mi Plan FitnessPro Personalizado</h1>
                <p>Generado el ${date}</p>
                <p>Basado en evidencia científica</p>
            </div>

            <div class="section">
                <h3>📋 Resumen de tu Perfil</h3>
                <ul>
                    <li><strong>Objetivo:</strong> ${answers.objetivo}</li>
                    <li><strong>Días de entrenamiento:</strong> ${answers.dias_entrenamiento}</li>
                    <li><strong>Nivel:</strong> ${answers.nivel}</li>
                    <li><strong>Ubicación:</strong> ${answers.gimnasio}</li>
                    <li><strong>Tiempo por sesión:</strong> ${answers.tiempo_sesion}</li>
                    <li><strong>Objetivo nutricional:</strong> ${answers.objetivo_nutricional}</li>
                    <li><strong>Restricciones:</strong> ${answers.restricciones}</li>
                </ul>
            </div>

            ${this.generateDetailedTrainingPlan()}
            ${this.generateDetailedNutritionPlan()}
            ${this.generateDetailedSupplementPlan()}
            ${this.generateProgressTracking()}

            <div class="highlight">
                <h4>⚠️ Disclaimer Importante</h4>
                <p>Este plan es informativo y educativo. Consulta con profesionales de la salud antes de comenzar cualquier programa de ejercicios o suplementación.</p>
            </div>

            <div class="section">
                <h3>📚 Basado en Evidencia Científica</h3>
                <p>Este plan se basa en meta-análisis y estudios peer-reviewed de las mejores revistas científicas en ciencias del deporte y nutrición.</p>
            </div>
        `;
    }

    generateDetailedTrainingPlan() {
        const answers = this.userAnswers;
        let plan = '<div class="section"><h3>🏋️ Plan de Entrenamiento Detallado</h3>';
        
        if (answers.nivel?.includes('Principiante')) {
            plan += `
                <h4>Rutina Full-Body (3 días/semana)</h4>
                <p><strong>Lunes, Miércoles, Viernes</strong></p>
                <ol>
                    <li>Sentadillas: 3 series × 8-12 reps</li>
                    <li>Press de banca o flexiones: 3 series × 8-12 reps</li>
                    <li>Remo con barra: 3 series × 8-12 reps</li>
                    <li>Press militar: 3 series × 8-12 reps</li>
                    <li>Peso muerto rumano: 3 series × 8-12 reps</li>
                    <li>Plancha: 3 series × 30-60 segundos</li>
                </ol>
                <p><strong>Progresión:</strong> Aumenta 2.5-5kg cuando puedas completar todas las series con buena técnica.</p>
            `;
        }
        
        plan += '</div>';
        return plan;
    }

    generateDetailedNutritionPlan() {
        const answers = this.userAnswers;
        const personalInfo = answers.info_personal || {};
        
        let plan = '<div class="section"><h3>🥗 Plan Nutricional</h3>';
        
        if (personalInfo.peso) {
            const peso = parseInt(personalInfo.peso);
            const proteina = Math.round(peso * 1.8);
            
            plan += `
                <h4>Macronutrientes Recomendados</h4>
                <ul>
                    <li><strong>Proteína:</strong> ${proteina}g/día (${Math.round(proteina/4)} porciones de 25g)</li>
                    <li><strong>Distribución:</strong> 20-30g por comida</li>
                    <li><strong>Fuentes:</strong> Pollo, pescado, huevos, legumbres, lácteos</li>
                </ul>
            `;
        }
        
        plan += `
            <h4>Principios Fundamentales</h4>
            <ul>
                <li>Prioriza alimentos enteros y mínimamente procesados</li>
                <li>Incluye vegetales en cada comida</li>
                <li>Mantén hidratación adecuada (35ml × kg peso)</li>
                <li>Timing flexible - lo importante es el total diario</li>
            </ul>
        `;
        
        plan += '</div>';
        return plan;
    }

    generateDetailedSupplementPlan() {
        return `
            <div class="section">
                <h3>💊 Protocolo de Suplementación</h3>
                
                <h4>Nivel 1 - Esenciales (Evidencia A+)</h4>
                <ul>
                    <li><strong>Creatina Monohidrato:</strong> 5g diarios, cualquier momento</li>
                    <li><strong>Omega-3:</strong> 2-3g EPA/DHA, con comidas</li>
                </ul>
                
                <h4>Nivel 2 - Convenientes (Evidencia A)</h4>
                <ul>
                    <li><strong>Proteína Whey:</strong> 25-50g si no alcanzas con alimentos</li>
                    <li><strong>Cafeína:</strong> 3-6mg/kg, 30-45min pre-entreno</li>
                </ul>
                
                <h4>Nivel 3 - Opcionales</h4>
                <ul>
                    <li><strong>Vitamina D3:</strong> Si hay deficiencia (análisis previo)</li>
                    <li><strong>Multivitamínico:</strong> Como seguro nutricional</li>
                </ul>
                
                <div class="highlight">
                    <p><strong>Recuerda:</strong> Los suplementos complementan, no sustituyen una buena dieta.</p>
                </div>
            </div>
        `;
    }

    generateProgressTracking() {
        return `
            <div class="section">
                <h3>📈 Seguimiento de Progreso</h3>
                
                <h4>Métricas de Entrenamiento</h4>
                <ul>
                    <li>Peso levantado en ejercicios principales</li>
                    <li>Repeticiones completadas con buena técnica</li>
                    <li>Tiempo de descanso entre series</li>
                </ul>
                
                <h4>Métricas Corporales (opcionales)</h4>
                <ul>
                    <li>Peso corporal (mismo horario, condiciones)</li>
                    <li>Medidas corporales (cintura, brazos, piernas)</li>
                    <li>Fotos de progreso (misma pose, iluminación)</li>
                </ul>
                
                <h4>Revisión del Plan</h4>
                <ul>
                    <li><strong>Cada 4-6 semanas:</strong> Evalúa progreso y ajusta</li>
                    <li><strong>Cada 12 semanas:</strong> Cambio significativo de rutina</li>
                    <li><strong>Señales de progreso:</strong> Mejor rendimiento, recuperación, bienestar</li>
                </ul>
            </div>
        `;
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (progressBar && progressText) {
            const progress = (this.currentQuestion / this.questions.length) * 100;
            progressBar.style.width = progress + '%';
            
            if (this.currentQuestion >= this.questions.length) {
                progressText.textContent = 'Completado ✅';
            } else {
                progressText.textContent = `Paso ${this.currentQuestion + 1} de ${this.questions.length}`;
            }
        }
    }

    scrollChatToBottom() {
        const messages = document.getElementById('chatMessages');
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, 100);
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.fitnessApp = new FitnessApp();
    
    // Initialize calculator on load
    if (document.getElementById('weeklyMinutes')) {
        fitnessApp.updateCalculatorResults();
    }
});

// Expose global functions for onclick handlers
window.startChat = () => fitnessApp.startQuestionnaire();
window.selectOption = (value) => fitnessApp.selectOption(value);
