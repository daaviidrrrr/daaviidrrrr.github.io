// Fitness Website JavaScript - Complete Functionality

class FitnessWebsite {
    constructor() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.questions = [
            {
                id: 'objetivo',
                question: '¿Cuál es tu objetivo principal?',
                options: ['Perder peso', 'Ganar músculo', 'Mejorar resistencia', 'Mantener forma física', 'Rehabilitación'],
                type: 'single'
            },
            {
                id: 'dias_entrenamiento',
                question: '¿Cuántos días puedes entrenar por semana?',
                options: ['2-3 días', '4-5 días', '6-7 días'],
                type: 'single'
            },
            {
                id: 'nivel_experiencia',
                question: '¿Cuál es tu nivel de experiencia?',
                options: ['Principiante (0-1 año)', 'Intermedio (1-3 años)', 'Avanzado (3+ años)'],
                type: 'single'
            },
            {
                id: 'acceso_gimnasio',
                question: '¿Tienes acceso a un gimnasio?',
                options: ['Sí, gimnasio completo', 'Gimnasio básico en casa', 'Solo ejercicio con peso corporal'],
                type: 'single'
            },
            {
                id: 'objetivo_nutricional',
                question: '¿Cuál es tu objetivo nutricional principal?',
                options: ['Aumentar masa muscular', 'Perder grasa corporal', 'Mejorar rendimiento deportivo', 'Salud general'],
                type: 'single'
            },
            {
                id: 'restricciones_alimentarias',
                question: '¿Tienes alguna restricción alimentaria?',
                options: ['Ninguna', 'Vegetariano', 'Vegano', 'Intolerancia a lactosa', 'Celíaco', 'Otras alergias'],
                type: 'single'
            },
            {
                id: 'suplementos_actuales',
                question: '¿Qué suplementos tomas actualmente?',
                options: ['Ninguno', 'Proteína en polvo', 'Creatina', 'Multivitamínico', 'Pre-entreno', 'Otros'],
                type: 'multiple'
            },
            {
                id: 'edad_genero',
                question: 'Información adicional:',
                fields: [
                    { name: 'edad', label: 'Edad', type: 'number', min: 16, max: 80 },
                    { name: 'genero', label: 'Género', type: 'select', options: ['Masculino', 'Femenino', 'Otro'] },
                    { name: 'peso', label: 'Peso (kg)', type: 'number', min: 40, max: 200 }
                ],
                type: 'form'
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupCounters();
        this.setupBlogFilters();
        this.setupHealthCalculator();
        this.setupFormHandlers();
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.classList.add('hidden');
            }
        }, 1500);
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
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

        // Chatbot modal functionality
        const chatbotTriggers = document.querySelectorAll('.chatbot-trigger');
        const modal = document.getElementById('chatbotModal');
        const closeBtn = document.querySelector('.close');

        chatbotTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                this.openChatbot();
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeChatbot();
            });
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeChatbot();
                }
            });
        }

        // User type selector
        document.querySelectorAll('.user-type-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.user-type-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                const userType = card.dataset.user;
                this.personalizeContent(userType);
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTopBtn = document.getElementById('backToTop');
        
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
            backToTopBtn?.classList.add('visible');
        } else {
            navbar?.classList.remove('scrolled');
            backToTopBtn?.classList.remove('visible');
        }
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    this.animateCounter(counter, target);
                    counterObserver.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    }

    setupBlogFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                // Filter blog cards
                blogCards.forEach(card => {
                    if (category === 'todos' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    setupHealthCalculator() {
        const exerciseSlider = document.getElementById('exerciseMinutes');
        const minutesDisplay = document.getElementById('minutesDisplay');
        const cardioRisk = document.getElementById('cardioRisk');
        const lifeYears = document.getElementById('lifeYears');

        if (exerciseSlider) {
            exerciseSlider.addEventListener('input', (e) => {
                const minutes = parseInt(e.target.value);
                minutesDisplay.textContent = `${minutes} min`;

                // Calculate benefits (simplified formula)
                const cardioReduction = Math.min(Math.floor(minutes * 0.15), 50);
                const yearsAdded = Math.min(Math.round((minutes / 150) * 2.5 * 10) / 10, 7);

                cardioRisk.textContent = `${cardioReduction}%`;
                lifeYears.textContent = `${yearsAdded} años`;
            });
        }
    }

    setupFormHandlers() {
        // Newsletter forms
        document.querySelectorAll('.newsletter-form, .newsletter-form-main').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = form.querySelector('input[type="email"]').value;
                this.handleNewsletterSubmit(email);
            });
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(new FormData(contactForm));
            });
        }
    }

    // Chatbot functionality
    openChatbot() {
        const modal = document.getElementById('chatbotModal');
        if (modal) {
            modal.style.display = 'block';
            this.resetChatbot();
        }
    }

    closeChatbot() {
        const modal = document.getElementById('chatbotModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    resetChatbot() {
        this.currentQuestion = 0;
        this.userAnswers = {};
        this.displayWelcomeMessage();
    }

    displayWelcomeMessage() {
        const chatHistory = document.getElementById('chatHistory');
        chatHistory.innerHTML = `
            <div class="bot-message">
                <p>¡Hola! 👋 Soy tu asistente personal de FitnessPro.</p>
                <p>Te haré algunas preguntas para crear tu plan personalizado de entrenamiento y suplementación.</p>
                <p>El proceso toma solo 2-3 minutos. ¿Estás listo para empezar?</p>
                <button onclick="fitnessWebsite.startQuestionnaire()" class="btn btn--primary">¡Comenzar Cuestionario!</button>
            </div>
        `;
    }

    startQuestionnaire() {
        this.currentQuestion = 0;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.generatePlan();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const chatHistory = document.getElementById('chatHistory');
        
        let questionHTML = `
            <div class="bot-message">
                <p><strong>Pregunta ${this.currentQuestion + 1} de ${this.questions.length}</strong></p>
                <p>${question.question}</p>
        `;

        if (question.type === 'single') {
            questionHTML += '<div class="question-options">';
            question.options.forEach((option, index) => {
                questionHTML += `
                    <button class="option-btn" onclick="fitnessWebsite.selectOption('${question.id}', '${option}', false)">
                        ${option}
                    </button>
                `;
            });
            questionHTML += '</div>';
        } else if (question.type === 'multiple') {
            questionHTML += '<div class="question-options">';
            question.options.forEach((option, index) => {
                questionHTML += `
                    <button class="option-btn" onclick="fitnessWebsite.toggleMultipleOption('${question.id}', '${option}')">
                        ${option}
                    </button>
                `;
            });
            questionHTML += `
                <button class="btn btn--primary" onclick="fitnessWebsite.nextQuestion()" style="margin-top: 1rem;">
                    Continuar
                </button>
            `;
            questionHTML += '</div>';
        } else if (question.type === 'form') {
            questionHTML += '<div class="question-form">';
            question.fields.forEach(field => {
                if (field.type === 'select') {
                    questionHTML += `
                        <div class="form-group">
                            <label>${field.label}:</label>
                            <select id="field_${field.name}" required>
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
                                   min="${field.min || ''}" max="${field.max || ''}" required>
                        </div>
                    `;
                }
            });
            questionHTML += `
                <button class="btn btn--primary" onclick="fitnessWebsite.submitForm('${question.id}')">
                    Continuar
                </button>
            `;
            questionHTML += '</div>';
        }

        questionHTML += '</div>';
        chatHistory.innerHTML += questionHTML;
        this.scrollToBottom();
    }

    selectOption(questionId, option, isMultiple = false) {
        if (!isMultiple) {
            this.userAnswers[questionId] = option;
            this.addUserMessage(option);
            this.nextQuestion();
        }
    }

    toggleMultipleOption(questionId, option) {
        if (!this.userAnswers[questionId]) {
            this.userAnswers[questionId] = [];
        }
        
        const index = this.userAnswers[questionId].indexOf(option);
        const button = event.target;
        
        if (index === -1) {
            this.userAnswers[questionId].push(option);
            button.style.background = 'var(--primary-green)';
            button.style.color = 'white';
        } else {
            this.userAnswers[questionId].splice(index, 1);
            button.style.background = 'white';
            button.style.color = 'var(--primary-green)';
        }
    }

    submitForm(questionId) {
        const question = this.questions.find(q => q.id === questionId);
        const formData = {};
        
        question.fields.forEach(field => {
            const element = document.getElementById(`field_${field.name}`);
            formData[field.name] = element.value;
        });
        
        this.userAnswers[questionId] = formData;
        this.addUserMessage(`Edad: ${formData.edad}, Género: ${formData.genero}, Peso: ${formData.peso}kg`);
        this.nextQuestion();
    }

    addUserMessage(message) {
        const chatHistory = document.getElementById('chatHistory');
        chatHistory.innerHTML += `
            <div class="user-message">
                <p>${message}</p>
            </div>
        `;
        this.scrollToBottom();
    }

    nextQuestion() {
        this.currentQuestion++;
        setTimeout(() => {
            this.showQuestion();
        }, 500);
    }

    generatePlan() {
        const chatHistory = document.getElementById('chatHistory');
        
        // Generate personalized recommendations based on answers
        const plan = this.createPersonalizedPlan();
        
        chatHistory.innerHTML += `
            <div class="bot-message">
                <h4>🎉 ¡Tu Plan Personalizado Está Listo!</h4>
                ${plan}
                <div style="margin-top: 2rem;">
                    <button class="btn btn--primary" onclick="fitnessWebsite.downloadPDF()">
                        📄 Descargar Plan en PDF
                    </button>
                    <button class="btn btn--secondary" onclick="fitnessWebsite.resetChatbot()">
                        🔄 Hacer Nuevo Plan
                    </button>
                </div>
            </div>
        `;
        
        this.scrollToBottom();
    }

    createPersonalizedPlan() {
        const answers = this.userAnswers;
        let plan = '<div class="generated-plan">';
        
        // Training plan based on answers
        plan += '<h5>🏋️ Plan de Entrenamiento:</h5>';
        plan += '<ul>';
        
        if (answers.nivel_experiencia?.includes('Principiante')) {
            plan += '<li>Rutina full-body 3 días/semana</li>';
            plan += '<li>Enfoque en ejercicios básicos y técnica</li>';
            plan += '<li>Progresión gradual en cargas</li>';
        } else if (answers.nivel_experiencia?.includes('Intermedio')) {
            plan += '<li>Rutina push/pull/legs o upper/lower</li>';
            plan += '<li>4-5 días de entrenamiento</li>';
            plan += '<li>Incorporar técnicas de intensidad</li>';
        } else {
            plan += '<li>Rutinas especializadas y periodización</li>';
            plan += '<li>5-6 días de entrenamiento</li>';
            plan += '<li>Técnicas avanzadas y especialización</li>';
        }
        
        plan += '</ul>';
        
        // Nutrition recommendations
        plan += '<h5>🥗 Recomendaciones Nutricionales:</h5>';
        plan += '<ul>';
        
        if (answers.objetivo === 'Perder peso') {
            plan += '<li>Déficit calórico moderado (300-500 kcal)</li>';
            plan += '<li>Alto contenido en proteína (1.6-2.2g/kg)</li>';
            plan += '<li>Priorizar alimentos saciantes</li>';
        } else if (answers.objetivo === 'Ganar músculo') {
            plan += '<li>Ligero superávit calórico (200-400 kcal)</li>';
            plan += '<li>Alta ingesta proteica (1.8-2.5g/kg)</li>';
            plan += '<li>Carbohidratos alrededor del entrenamiento</li>';
        }
        
        plan += '</ul>';
        
        // Supplement recommendations
        plan += '<h5>💊 Suplementos Recomendados:</h5>';
        plan += '<ul>';
        
        const currentSupplements = answers.suplementos_actuales || [];
        
        if (!currentSupplements.includes('Creatina')) {
            plan += '<li>Creatina monohidrato: 5g diarios</li>';
        }
        
        if (!currentSupplements.includes('Proteína en polvo') && (answers.objetivo === 'Ganar músculo' || answers.restricciones_alimentarias?.includes('Vegano'))) {
            plan += '<li>Proteína en polvo: 25-50g post-entrenamiento</li>';
        }
        
        if (!currentSupplements.includes('Multivitamínico')) {
            plan += '<li>Multivitamínico de calidad</li>';
        }
        
        plan += '<li>Omega-3: 1-2g EPA/DHA diarios</li>';
        plan += '</ul>';
        
        plan += '</div>';
        
        return plan;
    }

    downloadPDF() {
        // Simulate PDF generation
        alert('🎉 ¡Genial! Tu plan personalizado se está preparando.\n\nEn una implementación real, aquí se generaría y descargaría un PDF completo con:\n\n• Rutinas detalladas con ejercicios\n• Plan nutricional personalizado\n• Guía de suplementación\n• Calendario de seguimiento\n\n¡Gracias por usar FitnessPro!');
    }

    scrollToBottom() {
        const chatHistory = document.getElementById('chatHistory');
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    // Content personalization based on user type
    personalizeContent(userType) {
        // This could dynamically update content based on user selection
        const recommendations = {
            principiante: {
                supplements: ['Proteína Whey', 'Creatina', 'Multivitamínico'],
                articles: ['Guía para principiantes', 'Técnica correcta'],
                intensity: 'básico'
            },
            intermedio: {
                supplements: ['Creatina', 'Proteína', 'Pre-entreno', 'Omega-3'],
                articles: ['Periodización', 'Técnicas avanzadas'],
                intensity: 'intermedio'
            },
            avanzado: {
                supplements: ['Stack completo', 'Suplementos especializados'],
                articles: ['Competición', 'Optimización avanzada'],
                intensity: 'avanzado'
            },
            salud: {
                supplements: ['Omega-3', 'Vitamina D', 'Multivitamínico'],
                articles: ['Ejercicio terapéutico', 'Prevención'],
                intensity: 'moderado'
            }
        };
        
        // Update UI based on selection (this could be expanded)
        console.log(`Contenido personalizado para: ${userType}`, recommendations[userType]);
    }

    // Form submission handlers
    handleNewsletterSubmit(email) {
        // Simulate newsletter subscription
        alert(`✅ ¡Gracias por suscribirte!\n\nEmpezarás a recibir contenido exclusivo de fitness y salud en: ${email}\n\nRevisa tu email para confirmar la suscripción.`);
    }

    handleContactSubmit(formData) {
        // Simulate contact form submission
        const name = formData.get('name');
        alert(`✅ ¡Gracias por tu mensaje, ${name}!\n\nHe recibido tu consulta y te responderé en un plazo de 24-48 horas.\n\n¡Que tengas un gran día!`);
    }
}

// Global functions for onclick handlers
window.startQuestionnaire = function() {
    window.fitnessWebsite.startQuestionnaire();
};

// Initialize website
document.addEventListener('DOMContentLoaded', () => {
    window.fitnessWebsite = new FitnessWebsite();
});

// Service Worker for PWA functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
