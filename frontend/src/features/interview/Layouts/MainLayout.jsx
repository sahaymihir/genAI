const MainLayout = ({ children }) => {
    return (
        <div className="theme-interview min-h-screen bg-background text-foreground antialiased">
            {children}
        </div>
    );
};

export default MainLayout;