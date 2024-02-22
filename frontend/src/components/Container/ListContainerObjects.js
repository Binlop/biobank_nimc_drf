import NestedMenu from "../../pages/Individ/NestedMenu";
import React from "react";

export default function ListContainerObjects({ children }) {
    return (
        <main className="container">
            <NestedMenu />
            <div className="features">
                    {children}
            </div>
        </main>
    );
}
