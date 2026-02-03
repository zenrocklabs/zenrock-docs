import React, { useState, useRef, useEffect } from 'react';

export default function MarkdownActionsDropdown() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  const isDocsPage = typeof document !== 'undefined'
    ? !!document.querySelector('article .markdown')
    : true;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isDocsPage) {
    return null;
  }

  const markdownUrl = currentPath === '/' || currentPath === ''
    ? '/intro.md'
    : currentPath.endsWith('/')
      ? `${currentPath.slice(0, -1)}.md`
      : `${currentPath}.md`;

  const pageUrl = typeof window !== 'undefined'
    ? window.location.href
    : '';

  const prompt = `Read from this URL: ${pageUrl} and explain it to me`;

  const handleCopyMarkdown = async () => {
    try {
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error('Failed to fetch markdown');
      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy markdown:', error);
    }
  };

  const handleOpenMarkdown = () => {
    window.open(markdownUrl, '_blank');
    setIsOpen(false);
  };

  const handleOpenInClaude = () => {
    window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpen(false);
  };

  const handleOpenInChatGPT = () => {
    window.open(`https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpen(false);
  };

  const handleOpenInT3Chat = () => {
    window.open(`https://t3.chat/?prompt=${encodeURIComponent(prompt)}`, '_blank');
    setIsOpen(false);
  };

  const handleOpenInCursor = () => {
    const cursorPrompt = `Read from this URL:\n${pageUrl}\nand explain it to me`;
    window.open(`cursor://anysphere.cursor-deeplink/prompt?text=${encodeURIComponent(cursorPrompt)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="copy-page-container">
      <div className="copy-page-button-group">
        <button
          className="copy-page-main"
          onClick={handleCopyMarkdown}
          disabled={copied}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
              Copy page
            </>
          )}
        </button>
        <button
          className="copy-page-dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="copy-page-menu">
          <button className="copy-page-menu-item" onClick={handleOpenMarkdown}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <path d="M7 15V9l2 2 2-2v6"></path>
              <path d="M17 9v6l-2-2"></path>
            </svg>
            <div className="copy-page-menu-item-content">
              <span className="copy-page-menu-item-title">View as Markdown</span>
              <span className="copy-page-menu-item-desc">Open this page in Markdown</span>
            </div>
          </button>
          <button className="copy-page-menu-item" onClick={handleOpenInClaude}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd">
              <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z"></path>
            </svg>
            <div className="copy-page-menu-item-content">
              <span className="copy-page-menu-item-title">Open in Claude</span>
              <span className="copy-page-menu-item-desc">Ask questions about this page</span>
            </div>
          </button>
          <button className="copy-page-menu-item" onClick={handleOpenInChatGPT}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
            </svg>
            <div className="copy-page-menu-item-content">
              <span className="copy-page-menu-item-title">Open in ChatGPT</span>
              <span className="copy-page-menu-item-desc">Ask questions about this page</span>
            </div>
          </button>
          <button className="copy-page-menu-item" onClick={handleOpenInT3Chat}>
            <svg width="16" height="16" viewBox="0 0 258 199" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M165.735 25.0701L188.947 0.972412H0.465994V25.0701H165.735Z"></path>
              <path d="M163.981 96.3239L254.022 3.68314L221.206 3.68295L145.617 80.7609L163.981 96.3239Z"></path>
              <path d="M233.658 131.418C233.658 155.075 214.48 174.254 190.823 174.254C171.715 174.254 155.513 161.738 150 144.439L146.625 133.848L127.329 153.143L129.092 157.336C139.215 181.421 163.034 198.354 190.823 198.354C227.791 198.354 257.759 168.386 257.759 131.418C257.759 106.937 244.399 85.7396 224.956 74.0905L220.395 71.3582L202.727 89.2528L210.788 93.5083C224.403 100.696 233.658 114.981 233.658 131.418Z"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M88.2625 192.669L88.2626 45.6459H64.1648L64.1648 192.669H88.2625Z"></path>
            </svg>
            <div className="copy-page-menu-item-content">
              <span className="copy-page-menu-item-title">Open in T3 Chat</span>
              <span className="copy-page-menu-item-desc">Ask questions about this page</span>
            </div>
          </button>
          <button className="copy-page-menu-item" onClick={handleOpenInCursor}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path>
            </svg>
            <div className="copy-page-menu-item-content">
              <span className="copy-page-menu-item-title">Open in Cursor</span>
              <span className="copy-page-menu-item-desc">Ask questions about this page</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
