"use client";
import React, {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PromotionIcon from "@/appIcons/menu/promotions.svg";
import AccountIcon from "@/appIcons/menu/account.svg";
import AddresseIcon from "@/appIcons/menu/addresses.svg";
import FavoriteIcon from "@/appIcons/menu/favorites.svg";
import LogoutIcon from "@/appIcons/menu/logout.svg";
import UserIcon from "@/appIcons/menu/user.svg";
import NotificationIcon from "@/appIcons/menu/notificaiton.svg";
import CartIcon from "@/appIcons/menu/cart.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { changePathName, globalMaxWidth } from "@/utils/helpers";
import { Locale, countriesList } from "@/types/index";
import { appLinks } from "@/src/links";
import { useRouter } from "next/navigation";
import {
  toggleCartMenu,
  toggleLoginModal,
  toggleRegisterModal,
  toggleSideMenu,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { changeOrderType } from "@/src/redux/slices/productSlice";
import {
  getAuth,
  getCountryNameCookie,
  removeAuth,
  setOrderType,
} from "@/app/actions";
import LogoDark from "@/appImages/logo_dark.svg";
import LogoLight from "@/appImages/logo_light.svg";
import LogoSmall from "@/appImages/logo_small.svg";
import LogoOnly from "@/appImages/logo_only.svg";
import ArFlag from "@/appIcons/ar.svg";
import MarkerImg from "@/appIcons/marker.svg";
import AreaDropDown from "@/components/home/AreaDropDown";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import { PersonRemoveAlt1Outlined, ShoppingBag } from "@mui/icons-material";
import { Bars4Icon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import CartMenu from "@/components/header/CartMenu";
import { Popover } from "@headlessui/react";
import { useGetTopSearchQuery } from "@/src/redux/api";
import { isNull, map } from "lodash";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import {
  isAuthenticated,
  resetAuthentication,
} from "@/src/redux/slices/authSlice";
import { showWarningToastMessage } from "@/src/redux/slices/toastMessageSlice";

type Props = {
  showMiddleNav: boolean;
};
export default function ({ showMiddleNav = false }: Props): React.ReactNode {
  const { t } = useTranslation("trans");
  const locales: Locale["lang"][] = ["ar", "en"];
  const {
    area,
    country: { country_code },
    appSetting: { sideMenuOpen },
    product: { orderType },
    auth: { token, user },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams: any = useSearchParams!();
  const [searchValue, setSearchValue] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const pathName = usePathname()!;
  const isAuth = useAppSelector(isAuthenticated);
  const [stickyClass, setStickyClass] = useState(
    `absolute bg-white ${showMiddleNav ? "text-black" : "text-white"}`
  );
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const {
    data: searchKeys,
    isSuccess: searchKeysSuccess,
    isFetching,
    error,
  } = useGetTopSearchQuery();
  const btnRef = useRef<any>();
  const navigation: { name: string; href: string }[] = [
    { name: t("landing"), href: appLinks.landing(lang) },
    {
      name: t("home"),
      href: appLinks.home(lang, country_code),
    },
    {
      name: t("offers"),
      href: appLinks.offers(lang, country_code, ""),
    },
    { name: t("aboutus"), href: appLinks.aboutus(lang) },
    { name: t("contactus"), href: appLinks.contactus(lang) },
    { name: t("joinus"), href: appLinks.joinus(lang) },
    { name: t("faqs"), href: appLinks.faqs(lang) },
  ];
  const authNavigation: {
    name: string;
    href: string;
    icon: React.ReactNode;
  }[] = [
    {
      name: t("account"),
      href: appLinks.account(lang, country_code),
      icon: <AccountIcon className='w-6 h-6 mx-2' />,
    },
    {
      name: t("addresses"),
      href: appLinks.addresses(lang, country_code),
      icon: <AddresseIcon className='w-6 h-6 mx-2' />,
    },
    {
      name: t("favorites"),
      href: appLinks.favorites(lang, country_code),
      icon: <FavoriteIcon className='w-6 h-6 mx-2' />,
    },
    {
      name: t("promotions"),
      href: appLinks.promotions(lang, country_code),
      icon: <PromotionIcon className='w-6 h-6 mx-2' />,
    },
  ];

  const handleChangeLang = (item: Locale["lang"]) => {
    return router.push(
      `${changePathName(lang, item, pathName)}?${
        searchParams && searchParams.toString()
      }`
    );
  };

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    if (searchParams.has("search")) {
      setSearchValue(searchParams.get("search"));
    } else if (searchParams.has("key")) {
      setSearchValue(searchParams.get("key"));
    } else if (params?.key) {
      setSearchValue(params?.key);
    }
    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      if (windowHeight >= 20) {
        setStickyClass("fixed bg-white/80 text-black");
        setIsSticky(true);
      } else {
        setStickyClass(
          `absolute bg-white ${showMiddleNav ? "text-black" : "text-white"}`
        );
        setIsSticky(false);
      }
    }
  };

  const handleRegisterClick = () => {
    dispatch(toggleRegisterModal());
    // if (!token) {
    //   dispatch(toggleVerficationModal());
    // } else {
    //   dispatch(toggleRegisterModal());
    // }
  };

  const handleLogout = async () => {
    await removeAuth();
    dispatch(resetAuthentication());
    dispatch(showWarningToastMessage({ content: t("logout") }));
    dispatch(toggleLoginModal(false));
    router.replace(appLinks.home(lang, country_code));
  };

  const handleChangeSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleDropDown = (e: any) => {
    setVisible(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchValue.length > 1) {
      router.push(appLinks.search(lang, params?.country, searchValue));
    }
  };

  return (
    <div>
      <header className={`${stickyClass} top-0 z-50 ${globalMaxWidth} w-full`}>
        <nav
          className=' flex items-center justify-between p-3 lg:p-6 lg:px-8 border-b border-gray-200 lg:border-none'
          aria-label='Global'>
          <div className='flex'>
            <div className='hidden sm:flex'>
              <button
                type='button'
                className='-m-2.5 hidden sm:inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                onClick={() => dispatch(toggleSideMenu())}>
                <span className='sr-only'>Open main menu</span>
                {isSticky ? (
                  <>
                    {params?.country ? (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    ) : (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    )}{" "}
                  </>
                ) : (
                  <>
                    {params?.country ? (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    ) : (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-white`}
                      />
                    )}
                  </>
                )}
              </button>
            </div>
            <Link
              href={`/${lang}/${country_code ?? ``}`}
              className='-m-1.5  p-1.5'>
              {!params.country ? (
                <>
                  {isSticky ? (
                    <LogoDark className='hidden sm:flex h-8 w-auto sm:w-36 ' />
                  ) : (
                    <LogoLight className='hidden sm:flex h-8 w-auto sm:w-36 ' />
                  )}
                  <LogoSmall className='flex sm:hidden h-10 w-auto' />
                </>
              ) : (
                <>
                  <LogoDark className='hidden sm:flex h-8 w-auto sm:w-36 ' />
                  <LogoSmall className='flex sm:hidden h-10 w-auto' />
                </>
              )}
            </Link>
          </div>
          <div
            className={`hidden ${
              showMiddleNav && `hidden lg:flex`
            } lg:gap-x-12 overflow-hidden`}>
            <div className='flex flex-row justify-evenly items-start gap-x-2'>
              <div className='flex flex-row p-1 rounded-md bg-gray-100 '>
                <button
                  className={`px-3 py-2 text-black rounded-md capitalize ${
                    orderType === "pickup" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("pickup")}>
                  {t("pickup")}
                </button>
                <button
                  className={`px-3 py-2 text-black rounded-md capitalize ${
                    orderType === "delivery" ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => handleOrderType("delivery")}>
                  {t("delivery")}
                </button>
              </div>
              {area.id !== 0 && orderType !== "pickup" && <AreaDropDown />}
            </div>
          </div>
          <div className='flex sm:flex-1 sm:justify-end gap-x-4 '>
            {params?.country ? (
              <div className='flex flex-row w-full justify-end items-center'>
                <div className='relative rounded-md shadow-sm me-4 lg:w-3/5 xl:w-[350px]'>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <button
                        type='submit'
                        className='pointer-events-auto absolute inset-y-0 rtl:left-0 ltr:right-0 flex items-center rtl:pl-3 ltr:pr-3'>
                        <MagnifyingGlassIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </button>
                      <input
                        type='text'
                        name='search'
                        autoComplete='off'
                        autoCorrect='off'
                        autoCapitalize='off'
                        spellCheck='false'
                        defaultValue={searchValue}
                        className='input-default rtl:pl-10 ltr:pr-10'
                        placeholder={`${t("search")}`}
                        value={searchValue}
                        onChange={handleChangeSearch}
                        onFocus={() => {
                          setVisible(true);
                        }}
                        onBlur={() => {
                          setTimeout(() => setVisible(false), 500);
                        }}
                      />
                    </form>
                    <div
                      className={`${
                        visible ? `absolute` : `hidden`
                      } z-10 w-full py-4 bg-white`}>
                      <div className='flex w-full flex-col gap-y-2  rounded-lg '>
                        {visible && searchKeys?.data && (
                          <div className='flex flex-col text-black'>
                            <h1 className='py-2 px-4 capitalize'>
                              {t("popular_search")}
                            </h1>
                            {map(searchKeys.data?.top, (k: any, i: number) => (
                              <Link
                                key={i}
                                className='flex flex-row justify-start items-center gap-x-4 py-2 px-4 hover:bg-gray-50'
                                href={`${appLinks.search(
                                  lang,
                                  params?.country,
                                  k.key
                                )}`}>
                                <div>
                                  <MagnifyingGlassIcon
                                    className='h-5 w-5 text-gray-400'
                                    aria-hidden='true'
                                  />
                                </div>
                                <div>{k.key}</div>
                              </Link>
                            ))}
                            {isAuth && (
                              <>
                                <h1 className='py-2 px-4'>
                                  {t("history_search capitalize")}
                                </h1>
                                {map(
                                  searchKeys.data?.history,
                                  (k: any, i: number) => (
                                    <Link
                                      key={i}
                                      className='flex flex-row justify-start items-center gap-x-4 py-2 px-4 hover:bg-gray-50'
                                      href={`${appLinks.search(
                                        lang,
                                        params?.country,
                                        k.key
                                      )}`}>
                                      <div>
                                        <MagnifyingGlassIcon
                                          className='h-5 w-5 text-gray-400'
                                          aria-hidden='true'
                                        />
                                      </div>
                                      <div>{k.key}</div>
                                    </Link>
                                  )
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <img src='/solutions.jpg' alt='' />
                    </div>
                  </div>
                </div>
                <div className='flex flex-row gap-x-4'>
                  <CartIcon
                    onClick={() => dispatch(toggleCartMenu())}
                    className='w-7 h-7 cursor-pointer'
                  />
                  <NotificationIcon className='w-7 h-7 cursor-pointer' />

                  <div className='hidden'>
                    <button
                      type='button'
                      className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
                      onClick={() => dispatch(toggleSideMenu())}>
                      <span className='sr-only'>Open main menu</span>
                      <svg
                        className='h-6 w-6 cursor-pointer'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M23.0008 4H1V7H23.0008V4ZM23.0008 11.0008H1V14.0008H23.0008V11.0008ZM1 18.0004H23.0008V21.0004H1V18.0004Z'
                          fill='#0E1114'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className='hidden md:flex gap-x-4'>
                {isNull(token) && (
                  <>
                    <button
                      className={`p-3 w-32 bg-white/80 rounded-lg capitalize text-sm text-black`}
                      onClick={handleRegisterClick}>
                      {t("signup")}
                    </button>
                    <button
                      className={`p-3 w-32 bg-white/30 rounded-lg capitalize text-sm`}
                      onClick={() => dispatch(toggleLoginModal())}>
                      {t("login")}
                    </button>
                  </>
                )}
              </div>
            )}
            {/* change lang */}
            <button
              onClick={() => handleChangeLang(lang === "ar" ? "en" : "ar")}
              className='hidden sm:flex text-sm font-semibold pt-2'>
              <div className='flex flex-row justify-center items-center gap-x-3'>
                <ArFlag className='w-8 h-8 ' />
                <div
                  className={`${
                    isSticky
                      ? `text-black`
                      : ` ${params?.country ? `text-black` : `text-white`}`
                  }`}>
                  {lang === "ar" ? t("english") : t("arabic")}
                </div>
              </div>
            </button>
            <div className=''>
              <button
                type='button'
                className=' inline-flex sm:hidden items-center justify-center rounded-md p-2.5'
                onClick={() => dispatch(toggleSideMenu())}>
                <span className='sr-only'>Open main menu</span>
                {isSticky ? (
                  <>
                    {params?.country ? (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    ) : (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    )}{" "}
                  </>
                ) : (
                  <>
                    {params?.country ? (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-black`}
                      />
                    ) : (
                      <Bars3Icon
                        className={`w-10 h-10 font-bolder text-white`}
                      />
                    )}
                  </>
                )}
              </button>
            </div>
          </div>
        </nav>
        {/* delivery / pick up in sm screens */}
        <div className=' flex lg:hidden flex-row justify-between items-center px-3 me-12 py-2  gap-x-6 '>
          <div className='flex flex-row p-1 rounded-md bg-gray-100 '>
            <button
              className={`px-3 py-2 text-black rounded-md capitalize ${
                orderType === "pickup" ? "bg-white" : "bg-gray-100"
              }`}
              onClick={() => handleOrderType("pickup")}>
              {t("pickup")}
            </button>
            <button
              className={`px-3 py-2 text-black rounded-md capitalize ${
                orderType === "delivery" ? "bg-white" : "bg-gray-100"
              }`}
              onClick={() => handleOrderType("delivery")}>
              {t("delivery")}
            </button>
          </div>
          {area.id !== 0 && orderType !== "pickup" && <AreaDropDown />}
        </div>
        {/* mobile nav */}
        <Transition.Root show={sideMenuOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50'
            onClose={() => dispatch(toggleSideMenu(false))}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Panel className='fixed inset-y-0 ltr:right-0 ltr:left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
                <div className='flex w-full items-end justify-end'>
                  <button
                    type='button'
                    className='-m-2.5 rounded-md p-2.5 text-gray-400'
                    onClick={() => dispatch(toggleSideMenu(false))}>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='flex items-center justify-between'>
                  {isAuth ? (
                    <div>
                      <div className='flex items-center gap-x-4  py-3 text-sm font-semibold leading-6 text-gray-900 w-full'>
                        <UserIcon className='w-14 h-14' />
                        <div className='flex flex-col capitalize mx-2'>
                          <span className='text-md text-gray-600'>
                            {t("welcome")} !
                          </span>
                          <span className='text-lg font-bolder'>
                            {user.name}
                          </span>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-y-4 capitalize'>
                      <h2>{t("welcome_back")}</h2>
                      <p className='text-sm text-gray-500 leading-6 mb-2'>
                        {t("login_or_signup_to_continue")}
                      </p>
                      <button
                        className='btn-default'
                        onClick={() => dispatch(toggleLoginModal())}>
                        {t("login")}
                      </button>
                      <button
                        className='btn-transparent'
                        onClick={() => dispatch(toggleRegisterModal())}>
                        {t("signup")}
                      </button>
                    </div>
                  )}
                </div>
                <div className='mt-6 flow-root '>
                  <div className='-my-6 '>
                    <div className='py-6 '>
                      {!isAuth
                        ? navigation.map((item, i: number) => (
                            <Link
                              key={i}
                              href={item.href}
                              className='-mx-3 block border-b border-gray-200 p-3 py-4  text-base font-semibold leading-7 text-black hover:bg-gray-100 capitalize'>
                              {item.name}
                            </Link>
                          ))
                        : authNavigation.map((item, i: number) => (
                            <Link
                              key={i}
                              href={item.href}
                              className='flex flex-row justify-start items-center space-x-4 -mx-3 border-b border-gray-200 p-3 py-4  text-base font-semibold leading-7 text-black hover:bg-gray-100 capitalize'>
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          ))}
                      {isAuth && (
                        <button
                          onClick={handleLogout}
                          className='flex flex-row justify-start items-center w-[107%] space-x-4 -mx-3 border-b border-gray-200 p-3 py-4  text-base font-semibold leading-7 text-black hover:bg-gray-100 capitalize'>
                          <LogoutIcon className='w-6 h-6 mx-2' />
                          <span>{t("logout")}</span>
                        </button>
                      )}
                    </div>
                    <div className='py-6 '>
                      <Link
                        href={appLinks.aboutus(lang)}
                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black  capitalize'>
                        {t("aboutus")}
                      </Link>
                      <Link
                        href={appLinks.joinus(lang)}
                        className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-black  capitalize'>
                        {t("add_ur_resturant")}
                      </Link>
                      <ul
                        role='list'
                        className='mt-6 space-y-2 flex flex-col flex-1 justify-start items-start'>
                        <li className='text-sm flex flex-row justify-start items-center space-x-3'>
                          <Link
                            href={`${appLinks.aboutus(lang)}`}
                            className='text-gray-300 hover:text-white'>
                            <LogoOnly className='w-[4vh] h-[5vh]' />
                          </Link>
                          <div className='capitalize'>
                            <p>{t("discover_the_new_picks_app")}</p>
                            <p>{t("download_now")}</p>
                          </div>
                        </li>
                        <li className='text-sm'>
                          <Link
                            href={`${appLinks.aboutus(lang)}`}
                            className='text-gray-300 hover:text-white'>
                            <AppGallery className='w-[14vh] h-[5vh]' />
                          </Link>
                        </li>
                        <li className='text-sm'>
                          <Link
                            href={`${appLinks.aboutus(lang)}`}
                            className='text-gray-300 hover:text-white'>
                            <GooglePlay className='w-[14vh] h-[5vh]' />
                          </Link>
                        </li>
                        <li className='text-sm'>
                          <Link
                            href={`${appLinks.aboutus(lang)}`}
                            className='text-gray-300 hover:text-white'>
                            <AppGallery className='w-[14vh] h-[5vh]' />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
        <CartMenu />
      </header>
    </div>
  );
}
