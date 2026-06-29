import React, { useState } from 'react';

interface FormData {
  nome: string;
  departamento: string;
  ramal: string;
  email: string;
  cargo?: string;
  mostrarCargo?: boolean;
}

interface FormErrors {
  nome?: string;
  departamento?: string;
  ramal?: string;
  email?: string;
  cargo?: string;
}

interface SignatureFormProps {
  onGenerate: (data: FormData) => void;
  onError: (msg: string) => void;
}

const DEPARTAMENTOS = [
  { sigla: 'ACS', nome: 'Assessoria de Comunicação Social' },
  { sigla: 'ATCI', nome: 'Assessoria Técnica de Ciência e Inovação' },
  { sigla: 'CAVP', nome: 'Secretaria das Câmaras de Avaliação de Projetos' },
  { sigla: 'CPT', nome: 'Coordenação de Processos Administrativos Sancionadores e de Tomada de Contas Especiais' },
  { sigla: 'CSEC', nome: 'Controlaria Seccional' },
  { sigla: 'DAP', nome: 'Departamento de Análise de Propostas de Projetos' },
  { sigla: 'DBE', nome: 'Departamento de Programa de Bolsas e Eventos Técnicos' },
  { sigla: 'DCA', nome: 'Departamento de Controle de Processos e Atendimento ao Pesquisador' },
  { sigla: 'DCTI', nome: 'Diretoria de Ciência e Tecnologia de Inovação' },
  { sigla: 'DGP', nome: 'Departamento de Gestão de Pessoas' },
  { sigla: 'DMA', nome: 'Departamento de Monitoramento e Avaliação de Resultados' },
  { sigla: 'DMP', nome: 'Departamento de Material, Patrimônio e Serviços Gerais' },
  { sigla: 'DOT', nome: 'Departamento de Orçamento' },
  { sigla: 'DPC', nome: 'Departamento de Prestação de Contas' },
  { sigla: 'DPE', nome: 'Departamento de Parcerias Empresariais' },
  { sigla: 'DPGF', nome: 'Diretoria de Planejamento e Gestão e Finanças' },
  { sigla: 'DPP', nome: 'Departamento de Parcerias Públicas' },
  { sigla: 'DPT', nome: 'Departamento de Proteção e Transferência de Conhecimento' },
  { sigla: 'DTI', nome: 'Departamento de Tecnologia da Informação e Comunicação' },
  { sigla: 'GAB', nome: 'Gabinete da Presidência' },
  { sigla: 'GCF', nome: 'Gerência de Contabilidade e Finanças' },
  { sigla: 'GCT', nome: 'Gerência de Ciência e Tecnologia' },
  { sigla: 'GIN', nome: 'Gerência de Inovação' },
  { sigla: 'GLA', nome: 'Gerência de Logística e Aquisições' },
  { sigla: 'GMR', nome: 'Gerência de Monitoramento e Avaliação de Resultados' },
  { sigla: 'GPG', nome: 'Gerência de Planejamento e Gestão' },
  { sigla: 'NCC', nome: 'Núcleo de Compras e Contratos' },
  { sigla: 'NIOGE', nome: 'Núcleo de Inteligência Organizacional e Gestão Estratégica' },
  { sigla: 'PRE', nome: 'Presidência' },
  { sigla: 'PROC', nome: 'Procuradoria' }
];

export const SignatureForm: React.FC<SignatureFormProps> = ({ onGenerate, onError }) => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    departamento: '',
    ramal: '',
    email: '',
    cargo: '',
    mostrarCargo: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: keyof FormData, value: string): boolean => {
    if (name === 'mostrarCargo') return true;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let formattedValue: string | boolean = value;

    if (type === 'checkbox') {
      formattedValue = (e.target as HTMLInputElement).checked;
    } else if (name === 'ramal') {
      formattedValue = value.replace(/\D/g, ''); // Numbers only
    } else if (name === 'email') {
      formattedValue = value.replace(/\s/g, '').replace(/@.*/g, ''); // No spaces, remove domain
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error dynamically if user fixes it
    if (name !== 'mostrarCargo' && errors[name as keyof FormErrors]) {
      validateField(name as keyof FormData, formattedValue as string);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name !== 'mostrarCargo') {
      validateField(name as keyof FormData, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNomeValid = validateField('nome', formData.nome);
    const isDeptoValid = validateField('departamento', formData.departamento);
    const isRamalValid = validateField('ramal', formData.ramal);
    const isEmailValid = validateField('email', formData.email);
    const isCargoValid = formData.mostrarCargo ? validateField('cargo', formData.cargo || '') : true;

    if (!isNomeValid || !isDeptoValid || !isRamalValid || !isEmailValid || !isCargoValid) {
      onError('Por favor, preencha todos os campos corretamente.');
      return;
    }

    onGenerate({
      nome: formData.nome.trim(),
      departamento: formData.departamento.trim(),
      ramal: `(31) 3280-2${formData.ramal.trim()}`,
      email: `${formData.email.trim()}@fapemig.br`,
      cargo: formData.mostrarCargo ? (formData.cargo || '').trim() : '',
      mostrarCargo: formData.mostrarCargo
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
                placeholder="Ex: Rafael Viktor Soares Pereira"
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
              <select
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Selecione o departamento...</option>
                {DEPARTAMENTOS.map((dept) => (
                  <option key={dept.sigla} value={dept.nome}>
                    {dept.sigla}
                  </option>
                ))}
              </select>
            </div>
            <span className="error-message">{errors.departamento}</span>
          </div>

          {/* Caixa de seleção para Cargo */}
          <div className="form-group form-group-full checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="mostrarCargo"
                name="mostrarCargo"
                checked={formData.mostrarCargo}
                onChange={handleInputChange}
              />
              <span>Desejo incluir meu cargo na assinatura</span>
            </label>
          </div>

          {/* Input de Cargo (exibido apenas se marcado) */}
          {formData.mostrarCargo && (
            <div className={`form-group form-group-full ${errors.cargo ? 'invalid' : ''} animate-fade-in`}>
              <label htmlFor="cargo">Cargo</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  placeholder="Ex: Assessor de Comunicação / Coordenador"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <span className="error-message">{errors.cargo}</span>
            </div>
          )}

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
