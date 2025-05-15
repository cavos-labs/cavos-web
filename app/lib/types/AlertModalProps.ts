export interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	message: string;
	type: string;
	confirmText: string;
	cancelText: string;
	onConfirm: () => void;
	showCancel: boolean;
	isLoading?: boolean;
}
