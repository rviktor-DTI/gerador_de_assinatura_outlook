import React, { useState } from 'react';

interface FormData {
  nome: string;
  departamento: string;
  ramal: string;
  email: string;
}

interface FormErrors {
  nome?: string;
  departamento?: string;
  ramal?: string;
  email?: string;
}

interface SignatureFormProps {
  onGenerate: (data: FormData) => void;
  onError: (msg: string) => void;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({ onGenerate, onError }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    departamento: '',
    ramal: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: keyof FormData, value: string): boolean => {
    let errorMsg = '';
    const trimmed = value.trim();

    if (!trimmed) {
      errorMsg = 'Este campo é obrigatório.';
    } else if (name === 'ramal' && !/^\d{3}$/.test(trimmed)) {
      errorMsg = 'Informe um ramal válido com 3 dígitos.';
    } else if (name === 'email' && /\s/.test(trimmed)) {
      errorMsg = 'O e-mail não deve conter espaços.';
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg || undefined }));
    return !errorMsg;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'ramal') {
      formattedValue = value.replace(/\D/g, ''); // Numbers only
    } else if (name === 'email') {
      formattedValue = value.replace(/\s/g, '').replace(/@.*/g, ''); // No spaces, remove domain
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error dynamically if user fixes it
    if (errors[name as keyof FormData]) {
      validateField(name as keyof FormData, formattedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNomeValid = validateField('nome', formData.nome);
    const isDeptoValid = validateField('departamento', formData.departamento);
    const isRamalValid = validateField('ramal', formData.ramal);
    const isEmailValid = validateField('email', formData.email);

    if (!isNomeValid || !isDeptoValid || !isRamalValid || !isEmailValid) {
      onError('Por favor, preencha todos os campos corretamente.');
      return;
    }

    onGenerate({
      nome: formData.nome.trim(),
      departamento: formData.departamento.trim(),
      ramal: `(31) 3280-2${formData.ramal.trim()}`,
      email: `${formData.email.trim()}@fapemig.br`,
    });
  };

  return (
    <main className="main-card">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* Nome Completo */}
          <div className={`form-group form-group-full ${errors.nome ? 'invalid' : ''}`}>
            <label htmlFor="nome">Nome Completo</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: Rafael Viktor..."
                value={formData.nome}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <span className="error-message">{errors.nome}</span>
          </div>

          {/* Departamento */}
          <div className={`form-group form-group-full ${errors.departamento ? 'invalid' : ''}`}>
            <label htmlFor="departamento">Departamento</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="departamento"
                name="departamento"
                placeholder="Ex: Assessoria de Comunicação"
                value={formData.departamento}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <span className="error-message">{errors.departamento}</span>
          </div>

          {/* Ramal */}
          <div className={`form-group ${errors.ramal ? 'invalid' : ''}`}>
            <label htmlFor="ramal">Ramal</label>
            <div className="input-group">
              <span className="input-prefix">(31) 3280-2</span>
              <input
                type="text"
                id="ramal"
                name="ramal"
                placeholder="Ex: 440"
                maxLength={3}
                value={formData.ramal}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <span className="field-hint">Informe apenas os últimos 3 dígitos.</span>
            <span className="error-message">{errors.ramal}</span>
          </div>

          {/* E-mail */}
          <div className={`form-group ${errors.email ? 'invalid' : ''}`}>
            <label htmlFor="email">E-mail corporativo</label>
            <div className="input-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Ex: rviktor"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
              <span className="input-suffix">@fapemig.br</span>
            </div>
            <span className="field-hint">Informe apenas a primeira parte (prefixo).</span>
            <span className="error-message">{errors.email}</span>
          </div>
        </div>

        <button type="submit" className="btn-primary" id="btn-generate">
          <span>Gerar Assinatura</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </main>
  );
};
