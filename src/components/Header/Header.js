/* eslint-disable no-global-assign */
//компонент заголовка
import React from "react";
import "./Header.css";
import Reference from "../Reference/Reference";
import NavTab from "../NavTab/NavTab";
import NavMovies from "../NavMovies/NavMovies";

//принимает пропсы заголовок ссылки, ссылка
function Header({ styleColor, isLoggedIn, onNavPopup, ...props }) {
	return (
		<header
			className={
				window.location.pathname === "/"
					? "header"
					: "header header_theme_black"
			}
		>
			<div
				className={
					window.location.pathname === "/sign-in"
						? "header__nav-sign"
						: "header__nav" && window.location.pathname === "/sign-up"
						? "header__nav-sign"
						: "header__nav"
				}
			>
				<Reference
					classType={
						window.location.pathname === "/sign-in"
							? "link-logo-sign"
							: "link-logo" && window.location.pathname === "/sign-up"
							? "link-logo-sign"
							: "link-logo"
					}
					linkTo="/"
				/>
				{window.location.pathname !== "/sign-in" &&
					window.location.pathname !== "/sign-up" && (
						<>
							{isLoggedIn
								? (Element = (
										<>
											<NavMovies />
											<button
												className={
													window.location.pathname === "/"
														? "nav-popup"
														: "nav-popup nav-popup_theme_black"
												}
												type="button"
												onClick={onNavPopup}
											></button>

											<Reference
												classType="link-accaunt"
												classText="link__text-accaunt"
												linkTo="/profile"
												linkTitle="Аккаунт"
											/>
										</>
								  ))
								: (Element = <NavTab />)}
						</>
					)}
			</div>
		</header>
	);
}

export default Header;
