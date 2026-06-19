import { Toaster as Sonner } from 'sonner';

// shadcn-style Sonner, themed to the editorial dark UI. Mounted at the app
// root (outside .theme-interview), so the palette is set explicitly here.
const Toaster = (props) => {
	return (
		<Sonner
			theme="dark"
			position="top-right"
			className="toaster group"
			toastOptions={{
				style: {
					background: '#1b1a18',
					color: '#f1efe9',
					border: '1px solid rgba(255, 255, 255, 0.12)',
					borderRadius: '0.75rem',
					boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
					fontFamily: 'var(--font-sans)',
				},
				classNames: {
					title: 'font-medium',
					description: '!text-[#918b80]',
					actionButton: '!bg-[#f1efe9] !text-[#131211] !rounded-md',
					cancelButton: '!bg-white/10 !text-[#918b80] !rounded-md',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
