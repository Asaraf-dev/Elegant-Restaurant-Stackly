
/*--- Components ---*/
document.addEventListener("DOMContentLoaded", async () => {
    /*--- Component Configuration ---*/
    const components = [
        {
            id: "erNavbarContainer",
            path: "assets/components/navbar.html",
            name: "navbar"
        },
        {
            id: "erInnerHeroContainer",
            path: "assets/components/inner-hero.html",
            name: "inner-hero"
        },
        {
            id: "erFooterContainer",
            path: "assets/components/footer.html",
            name: "footer"
        }
    ];
    /*--- Load Single Component ---*/
    const loadComponent = async (component) => {
        const container = document.getElementById(component.id);
        if (!container) return;
        try {
            const response = await fetch(component.path);
            if (!response.ok) {
                throw new Error(`Failed to load ${component.name}: ${response.status}`);
            }
            const componentHTML = await response.text();
            container.innerHTML = componentHTML;
            container.dataset.loaded = "true";
            console.log(`${component.name} component loaded successfully.`);
            return {
                name: component.name,
                container: container
            };
        } catch (error) {
            console.error(`Component loading error (${component.name}):`, error);
            container.innerHTML = "";
            container.dataset.loaded = "false";
            return null;
        }
    };
    /*--- Load All Components ---*/
    const loadedComponents = await Promise.all(
        components.map(component => loadComponent(component))
    );
    /*--- Component Loading Complete ---*/
    const successfulComponents = loadedComponents.filter(Boolean);
    document.dispatchEvent(new CustomEvent("erComponentsLoaded", {
        detail: {
            components: successfulComponents.map(component => component.name),
            containers: successfulComponents.map(component => component.container)
        }
    }));
    /*--- Component Ready State ---*/
    document.documentElement.classList.add("er-components-ready");
});
