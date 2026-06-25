import React, { useRef } from 'react';

interface SignaturePreviewProps {
  compiledHtml: string;
  visible: boolean;
  onCopySuccess: (msg: string) => void;
  onCopyError: (msg: string) => void;
}

export const SignaturePreview: React.FC<SignaturePreviewProps> = ({
  compiledHtml,
  visible,
  onCopySuccess,
  onCopyError,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const fallbackCopy = (html: string) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    container.style.left = '-9999px';
    container.innerHTML = html;
    document.body.appendChild(container);

    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();

    const range = document.createRange();
    range.selectNodeContents(container);
    selection.addRange(range);

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        onCopySuccess('Assinatura copiada com sucesso.');
      } else {
        onCopyError('Erro ao copiar a assinatura.');
      }
    } catch (err) {
      console.error('Erro na cópia de fallback:', err);
      onCopyError('Erro ao copiar a assinatura.');
    }

    selection.removeAllRanges();
    document.body.removeChild(container);
  };

  const copyToClipboard = async () => {
    if (!previewRef.current) return;
    const htmlContent = previewRef.current.innerHTML;

    // Plain text fallback
    const plainText = previewRef.current.innerText || previewRef.current.textContent || '';

    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        const data = [
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          }),
        ];
        await navigator.clipboard.write(data);
        onCopySuccess('Assinatura copiada com sucesso.');
      } catch (err) {
        console.warn('Erro ao usar a Clipboard API, tentando fallback execCommand.', err);
        fallbackCopy(htmlContent);
      }
    } else {
      fallbackCopy(htmlContent);
    }
  };

  return (
    <section
      className={`preview-section ${visible ? 'visible' : ''}`}
      id="preview-section"
    >
      <div className="section-header">
        <h2>Prévia da Assinatura</h2>
        <p>Veja como sua assinatura ficará no Outlook. Se estiver tudo certo, clique em copiar.</p>
      </div>

      <div className="preview-card">
        <div className="preview-container-wrapper">
          <div
            className="signature-preview-box"
            id="signature-preview"
            ref={previewRef}
          >
            {compiledHtml ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: compiledHtml }}
              />
            ) : (
              <div className="empty-preview-state">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dashed-icon"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <line x1="3" x2="21" y1="9" y2="9" />
                  <line x1="9" x2="9" y1="21" y2="9" />
                </svg>
                <p>
                  Preencha os dados acima e clique em <strong>Gerar Assinatura</strong> para visualizar a prévia.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="preview-actions">
          <button
            type="button"
            className="btn-secondary"
            id="btn-copy"
            onClick={copyToClipboard}
            disabled={!compiledHtml}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copiar Assinatura
          </button>
        </div>
      </div>
    </section>
  );
};
