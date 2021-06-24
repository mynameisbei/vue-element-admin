import Clipboard from 'clipboard';
import { message } from '.';

function clipboardSuccess() {
  message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500,
  });
}

function clipboardError() {
  message({
    message: 'Copy failed',
    type: 'error',
  });
}

export default function handleClipboard(text: string, event: Event): void {
  if (event.target) {
    const clipboard = new Clipboard(event.target as HTMLElement, {
      text: () => text,
    });
    clipboard.on('success', () => {
      clipboardSuccess();
      clipboard.destroy();
    });
    clipboard.on('error', () => {
      clipboardError();
      clipboard.destroy();
    });
    (clipboard as any).onClick(event);
  }
}
