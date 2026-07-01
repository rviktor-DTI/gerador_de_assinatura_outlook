import React, { useState } from 'react';

interface StepProps {
  num: number;
  title: string;
  text: string;
  imgSrc: string;
}

const TutorialStep: React.FC<StepProps> = ({ num, title, text, imgSrc }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="tutorial-step">
      <div className="step-num">{num}</div>
      <div className="step-body">
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: text }} />
        <div className="img-placeholder-box">
          {!imgError && (
            <img
              src={imgSrc}
              alt={title}
              className="tutorial-img"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{ display: imgLoaded ? 'block' : 'none' }}
            />
          )}
          {(!imgLoaded || imgError) && (
            <div className="placeholder-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span>
                {imgError
                  ? `Salve o print em: public${imgSrc}`
                  : 'Espaço para o print explicativo'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Tutorial: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'classic'>('new');

  return (
    <section
      className={`tutorial-section ${visible ? 'visible' : ''}`}
      id="tutorial-section"
    >
      <div className="section-header">
        <h2>Como Configurar a Assinatura no Outlook</h2>
        <p>Siga o passo-a-passo detalhado abaixo correspondente à sua versão do Outlook.</p>
      </div>

      <div className="tutorial-container">
        {/* Abas de Navegação */}
        <div className="tutorial-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Outlook (Novo)
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'classic' ? 'active' : ''}`}
          onClick={() => setActiveTab('classic')}
        >
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Outlook Clássico (Antigo)
        </button>
      </div>

      <div className="tutorial-card">

        {/* Outlook Novo */}
        {activeTab === 'new' && (
          <div className="tutorial-content">
            <TutorialStep
              num={1}
              title="Passo 1: Abrir as Configurações"
              text="No Novo Outlook, no canto superior direito da tela (perto dos botões de minimizar e fechar) clique no desenho de uma <strong>Engrenagem (Configurações)</strong>."
              imgSrc="/print_novo_passo1.png"
            />
            <TutorialStep
              num={2}
              title="Passo 2: Entrar no menu Contas"
              text="Na janela de configurações que abriu, clique em <strong>Contas</strong> que está na lista do menu do lado esquerdo."
              imgSrc="/print_novo_passo2.png"
            />
            <TutorialStep
              num={3}
              title="Passo 3: Acessar a tela de Assinaturas"
              text="Na coluna do meio que apareceu na tela, clique na opção <strong>Assinaturas</strong>."
              imgSrc="/print_novo_passo3.png"
            />
            <TutorialStep
              num={4}
              title="Passo 4: Criar uma nova assinatura"
              text="No painel que foi aberto à direita, clique em <strong>+ Adicionar assinatura</strong>."
              imgSrc="/print_novo_passo4.png"
            />
            <TutorialStep
              num={5}
              title="Passo 5: Dar um nome para a assinatura"
              text="No campo de texto escrito 'Adicionar um nome da assinatura', digite um nome para identificá-la (ex: <strong>Assinatura FAPEMIG</strong>)."
              imgSrc="/print_novo_passo5.png"
            />
            <TutorialStep
              num={6}
              title="Passo 6: Colar a sua assinatura"
              text="Clique com o botão esquerdo do mouse dentro do retangulo branco que fica logo abaixo do nome. No seu teclado, aperte e segure a tecla <strong>Ctrl</strong> e, sem soltá-la, aperte a letra <strong>V</strong> (<kbd>Ctrl</kbd> + <kbd>V</kbd>) para colar a assinatura."
              imgSrc="/print_novo_passo6.png"
            />
            <TutorialStep
              num={7}
              title="Passo 7: Escolher quando usar a assinatura"
              text="Logo abaixo do retangulo onde você colou a assinatura, procure pelas caixinhas <strong>'Definir como padrão para novas mensagens'</strong> e <strong>'Definir como padrão para respostas e encaminhamentos'</strong> e marque as duas."
              imgSrc="/print_novo_passo7.png"
            />
            <TutorialStep
              num={8}
              title="Passo 8: Salvar a assinatura"
              text="Para finalizar, clique no botão <strong>Salvar</strong> que fica no canto inferior direito da janela de configurações. Pronto, sua assinatura está configurada!"
              imgSrc="/print_novo_passo8.png"
            />
          </div>
        )}

        {/* Outlook Antigo */}
        {activeTab === 'classic' && (
          <div className="tutorial-content">
            <TutorialStep
              num={1}
              title="Passo 1: Abrir o menu Arquivo"
              text="Com o Outlook aberto, clique em <strong>Arquivo</strong> que fica no topo esquerdo da tela (no menu superior horizontal)."
              imgSrc="/print_antigo_passo1.png"
            />
            <TutorialStep
              num={2}
              title="Passo 2: Entrar em Opções"
              text="Uma tela com várias opções irá aparecer. Vá até o final da barra lateral esquerda e clique em <strong>Opções</strong>."
              imgSrc="/print_antigo_passo2.png"
            />
            <TutorialStep
              num={3}
              title="Passo 3: Escolher a categoria Email"
              text="Uma nova janela se abrirá. No menu do lado esquerdo dessa janela, clique em <strong>Email</strong>."
              imgSrc="/print_antigo_passo3.png"
            />
            <TutorialStep
              num={4}
              title="Passo 4: Clicar em Assinaturas..."
              text="No lado direito da mesma janela, encontre a seção 'Crie ou modifique assinaturas das mensagens' e clique no botão <strong>Assinaturas...</strong>."
              imgSrc="/print_antigo_passo4.png"
            />
            <TutorialStep
              num={5}
              title="Passo 5: Criar uma nova assinatura"
              text="Na janela de Assinaturas que apareceu, clique no botão <strong>Novo</strong> (que fica abaixo da lista de assinaturas)."
              imgSrc="/print_antigo_passo5.png"
            />
            <TutorialStep
              num={6}
              title="Passo 6: Dar um nome para a assinatura"
              text="Uma caixinha menor vai aparecer pedindo um nome. Digite um nome para ela (ex: <strong>Assinatura FAPEMIG</strong>) e depois clique no botão <strong>OK</strong>."
              imgSrc="/print_antigo_passo6.png"
            />
            <TutorialStep
              num={7}
              title="Passo 7: Colar a sua assinatura"
              text="Clique com o botão esquerdo do mouse dentro do retangulo branco que fica na parte de baixo da janela. No seu teclado, aperte e segure a tecla <strong>Ctrl</strong> e, sem soltá-la, aperte a letra <strong>V</strong> (<kbd>Ctrl</kbd> + <kbd>V</kbd>) para colar a assinatura."
              imgSrc="/print_antigo_passo7.png"
            />
            <TutorialStep
              num={8}
              title="Passo 8: Escolher quando usar a assinatura"
              text="Na parte inferior da janela, mude as caixinhas de seleção <strong>Novas mensagens</strong> e <strong>Respostas/encaminhamentos</strong> para a assinatura que você acabou de criar."
              imgSrc="/print_antigo_passo8.png"
            />
            <TutorialStep
              num={9}
              title="Passo 9: Salvar as configurações"
              text="Clique no botão <strong>Salvar</strong> que fica abaixo da assinatura. Depois, clique em <strong>OK</strong> na parte de baixo desta janela e também em <strong>OK</strong> na janela anterior para salvar tudo."
              imgSrc="/print_antigo_passo9.png"
            />
          </div>
        )}
      </div>
      </div>
    </section>
  );
};
