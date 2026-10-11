import React from "react";

export default function ErrorNotice({
  message,
  onClose,
  onRetry,
  inline = false,
}) {
  if (!message) return null;

  return (
    <div
      className={`analisai-error-notice${
        inline ? " analisai-error-notice--inline" : ""
      }`}
      role="alert"
      aria-atomic="true"
    >
      <svg
        className="analisai-error-notice__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
      </svg>

      <div className="analisai-error-notice__content">
        <strong>Atenção</strong>
        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            className="analisai-error-notice__retry"
            onClick={onRetry}
          >
            Tentar novamente
          </button>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          className="analisai-error-notice__close"
          aria-label="Fechar aviso de erro"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
            focusable="false"
          >
            <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}