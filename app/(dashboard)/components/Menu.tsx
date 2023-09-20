import MenuItem from "./MenuItem";

const Menu = () => {
    return (
        <div>
            <ul>
                <MenuItem href="/dashboard" title="Ders Programı" />
                <MenuItem href="/dashboard/results" title="Notlarım" />
                <MenuItem href="/" title="Çıkış Yap" />
            </ul>
        </div>
    );
};

export default Menu;
