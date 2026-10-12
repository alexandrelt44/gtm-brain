// GTM Brain skin for the Proof SDK editor (injected by scripts/proof.sh; the SDK
// is not modified). It translates the editor UI to PT-BR, recolors it to the
// brain's palette, hides what does not apply when embedded, and takes the
// display name from the GTM Brain. Document content (.ProseMirror) is never touched.
(function () {
  'use strict';

  // Display name handed over by the GTM Brain: skips the "Choose a display name" prompt.
  try {
    var params = new URLSearchParams(location.search);
    var name = params.get('gtm_name');
    if (name && !localStorage.getItem('proof-share-viewer-name')) localStorage.setItem('proof-share-viewer-name', name.slice(0, 48));
  } catch (e) { /* storage blocked: the prompt shows, nothing breaks */ }

  var EMBEDDED = window.top !== window;

  // Exact UI strings (from the SDK source and from the rendered editor).
  var T = {
    'Accept': 'Aceitar',
    'Accept All': 'Aceitar todas',
    'Access revoked': 'Acesso revogado',
    'Active Agents': 'Agentes ativos',
    'Activity': 'Atividade',
    'Add': 'Adicionar',
    'Add agent': 'Adicionar agente',
    'Add an agent': 'Adicionar um agente',
    'Add comment': 'Comentar',
    'Add Comment for Proof': 'Comentar para o agente',
    'Add comment on selected text': 'Comentar o trecho selecionado',
    'Agent collaborators can suggest and edit with the same permissions as the link you share.': 'Agentes colaboradores podem sugerir e editar com as mesmas permissões do link compartilhado.',
    'agent collaborator': 'agente colaborador',
    'AI collaborator': 'Colaborador de IA',
    'All open comments are nearby.': 'Todos os comentários abertos estão por perto.',
    'Apply': 'Aplicar',
    'Ask Proof': 'Pedir ao agente',
    'Ask Proof...': 'Peça ao agente…',
    'Cancel': 'Cancelar',
    'Cancelled': 'Cancelado',
    'Choose a display name': 'Escolha um nome de exibição',
    'Click to manage': 'Clique para gerenciar',
    'Close': 'Fechar',
    'Collaborator': 'Colaborador',
    'Collaborators': 'Colaboradores',
    'Comment': 'Comentar',
    'Comment resolved': 'Comentário resolvido',
    'Comment thread': 'Conversa do comentário',
    'Connecting': 'Conectando',
    'Connecting...': 'Conectando…',
    'Continue': 'Continuar',
    'Continue anonymously': 'Continuar sem nome',
    'Copied!': 'Copiado!',
    'Copy the agent invite link.': 'Copie o link de convite do agente.',
    'Copy agent invite link': 'Copiar link de convite do agente',
    'Disconnect AI collaborator': 'Desconectar colaborador de IA',
    'Select text first': 'Selecione um trecho primeiro',
    'Copy this prompt': 'Copiar este prompt',
    'Copy to clipboard': 'Copiar',
    'Default': 'Padrão',
    'Delete': 'Excluir',
    'Discard': 'Descartar',
    'Disconnect': 'Desconectar',
    'Disconnect removes live presence from this doc, but does not revoke the link.': 'Desconectar tira a presença ao vivo deste documento, mas não revoga o link.',
    'Document is no longer shared': 'O documento não está mais compartilhado',
    'Done': 'Pronto',
    'Error': 'Erro',
    'Fix grammar': 'Corrigir gramática',
    'Flag': 'Sinalizar',
    'Flag selected text': 'Sinalizar o trecho selecionado',
    'Following': 'Seguindo',
    'How to connect:': 'Como conectar:',
    'Improve clarity': 'Deixar mais claro',
    'Interrupted': 'Interrompido',
    'Invite an agent collaborator to edit, suggest, and review this doc.': 'Convide um agente para editar, sugerir e revisar este documento.',
    'Live collaboration is currently unavailable for this shared document.': 'A colaboração ao vivo está indisponível para este documento.',
    'Live collaboration is temporarily unavailable.': 'A colaboração ao vivo está temporariamente indisponível.',
    'Live sync unavailable': 'Sincronização ao vivo indisponível',
    'Loading editor...': 'Carregando editor…',
    'Make shorter': 'Encurtar',
    'Mermaid source': 'Código Mermaid',
    'No activity yet.': 'Nenhuma atividade ainda.',
    'Offline': 'Offline',
    'Offline - reconnecting': 'Offline, reconectando',
    'Offline - unsaved changes': 'Offline, alterações não salvas no editor',
    'Open': 'Abrir',
    'Paste it into your AI tool (for example, ChatGPT or Claude).': 'Cole na sua ferramenta de IA (por exemplo, Claude ou ChatGPT).',
    'Please enter your name or continue anonymously.': 'Digite seu nome ou continue sem nome.',
    'Proof Editor': 'Editor',
    'Proof is thinking...': 'O agente está pensando…',
    'Quick Actions': 'Ações rápidas',
    'Read-only mode — changes will not be saved': 'Modo leitura: as alterações não serão salvas',
    'Reading...': 'Lendo…',
    'Ready': 'Pronto',
    'Reject': 'Rejeitar',
    'Reject All': 'Rejeitar todas',
    'Reply': 'Responder',
    'Reply...': 'Responder…',
    'Resume': 'Retomar',
    'Retry': 'Tentar de novo',
    'Review': 'Revisar',
    'Run Review': 'Rodar revisão',
    // "Saved" here means saved in the editor; writing to the brand is a separate step in the brain.
    'Saved': 'Salvo no editor',
    'Saving': 'Salvando no editor',
    'Saving...': 'Salvando no editor…',
    'Send': 'Enviar',
    'Share': 'Compartilhar',
    'Share options': 'Opções de compartilhamento',
    'Skip - just start writing': 'Pular e começar a escrever',
    'Stop All Reviews': 'Parar todas as revisões',
    'Suggest': 'Sugerir',
    'Suggest replacement for selected text': 'Sugerir substituição para o trecho',
    'Suggestion': 'Sugestão',
    'Syncing...': 'Sincronizando…',
    'The agent appears here when connected.': 'O agente aparece aqui quando se conectar.',
    'Theme:': 'Tema:',
    'Thinking...': 'Pensando…',
    'This document was shared with you. You can edit it, and your changes are saved automatically.': 'Este documento foi compartilhado com você. Você pode editar, e as alterações ficam salvas no editor automaticamente.',
    'Undo': 'Desfazer',
    'Undo rewrite': 'Desfazer reescrita',
    'Use an agent collaborator in this doc': 'Use um agente colaborador neste documento',
    'Waiting': 'Aguardando',
    'What would you like Proof to do?': 'O que você quer que o agente faça?',
    'What your agent can do': 'O que seu agente pode fazer',
    'Working...': 'Trabalhando…',
    'Works with Claw, Claude Code, Codex, ChatGPT, Cursor, and more.': 'Funciona com Claude Code, Codex, ChatGPT, Cursor e outros.',
    'Write a comment...': 'Escreva um comentário…',
    'Write with an AI agent': 'Escrever com um agente de IA',
    'Your name': 'Seu nome',
    'Your name appears on comments and edits.': 'Seu nome aparece nos comentários e nas edições.',
  };
  // Strings with numbers or names in them.
  var P = [
    [/^Agent collaborators \((\d+)\)$/, function (m, n) { return 'Agentes colaboradores (' + n + ')'; }],
    [/^(\d+) viewers?$/, function (m, n) { return n + (n === '1' ? ' pessoa' : ' pessoas'); }],
    [/^(\d+) agent collaborators?\. Open actions$/, function (m, n) { return n + (n === '1' ? ' agente colaborador' : ' agentes colaboradores') + '. Abrir ações'; }],
    [/^(.*) — (\d+) viewers?$/, function (m, t, n) { return t + ' · ' + n + (n === '1' ? ' pessoa' : ' pessoas'); }],
    [/^(\d+) comments?$/, function (m, n) { return n + (n === '1' ? ' comentário' : ' comentários'); }],
    [/^(\d+) suggestions?$/, function (m, n) { return n + (n === '1' ? ' sugestão' : ' sugestões'); }],
    [/^Edited by (.+)$/, function (m, w) { return 'Editado por ' + w; }],
    [/^Suggested by (.+)$/, function (m, w) { return 'Sugerido por ' + w; }],
    [/^(\d+)m ago$/, function (m, n) { return 'há ' + n + ' min'; }],
    [/^(\d+)h ago$/, function (m, n) { return 'há ' + n + ' h'; }],
    [/^just now$/i, function () { return 'agora'; }],
  ];
  var missing = (window.__gtmUntranslated = new Set());
  var DONE = {};
  Object.keys(T).forEach(function (k) { DONE[T[k]] = 1; });

  function tr(s) {
    var key = s.trim();
    if (!key || !/[A-Za-z]/.test(key)) return null;
    if (Object.prototype.hasOwnProperty.call(T, key)) return s.replace(key, T[key]);
    for (var i = 0; i < P.length; i++) {
      var m = P[i][0].exec(key);
      if (m) return s.replace(key, P[i][1].apply(null, m));
    }
    if (/^[A-Z][a-z]/.test(key) && key.length < 160 && !DONE[key]) missing.add(key);
    return null;
  }
  function skip(el) {
    return !el || el.closest('.ProseMirror, [contenteditable="true"], pre, code, noscript, script, style');
  }
  var ATTRS = ['placeholder', 'title', 'aria-label'];
  var DARK = { 'rgb(17, 17, 17)': 1, 'rgb(0, 0, 0)': 1, 'rgb(17, 24, 39)': 1, 'rgb(31, 31, 31)': 1, 'rgb(26, 26, 26)': 1, 'rgb(34, 34, 34)': 1 };

  function pass(root) {
    root = root || document.body;
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = walker.nextNode())) {
      if (skip(n.parentElement)) continue;
      var out = tr(n.data);
      if (out !== null && out !== n.data) n.data = out;
    }
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label],button,a,[role="button"]') : [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (skip(el)) continue;
      for (var j = 0; j < ATTRS.length; j++) {
        var v = el.getAttribute(ATTRS[j]);
        if (v) {
          var t = tr(v);
          if (t !== null && t !== v) el.setAttribute(ATTRS[j], t);
        }
      }
      if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') {
        var bg = getComputedStyle(el).backgroundColor;
        if (DARK[bg] && !el.classList.contains('gtm-primary')) el.classList.add('gtm-primary');
      }
      // Embedded in the brain: the brain's bar already names the document and handles sharing.
      if (EMBEDDED && el.tagName === 'A' && el.textContent.trim() === 'Proof' && !el.closest('.ProseMirror')) el.classList.add('gtm-hidden');
      if (EMBEDDED && el.getAttribute('aria-label') === 'Opções de compartilhamento') el.classList.add('gtm-hidden');
      if (EMBEDDED && el.getAttribute('aria-label') === 'Share options') el.classList.add('gtm-hidden');
    }
  }

  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    // setTimeout, not requestAnimationFrame: hidden tabs never fire rAF.
    setTimeout(function () { queued = false; pass(); }, 40);
  }
  function start() {
    pass();
    new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  document.documentElement.lang = 'pt-BR';
})();
