import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
    CREATE_EXPENSE_URL, CREATE_HARVEST_URL, CREATE_HIVE_URL, CREATE_PRODUCT_URL, CREATE_SELL_URL
} from '../config/config';
import { translate } from '../utils/utils';

function DesktopSidebar() {
  const router = useRouter();
  return (
    <nav
      id="desktop-nav"
      className="fixed left-0 top-0 bottom-0 w-32 bg-primary text-txt-primary m-4 mr-0 rounded-md"
    >
      <Link href="/">
        <a className="">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1280.000000 877.000000"
          >
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g
              transform="translate(0.000000,877.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M7758 8183 c-58 -19 -126 -75 -144 -120 -16 -37 -18 -110 -5 -146 13
	  -33 66 -84 112 -107 28 -15 58 -20 116 -20 l78 0 47 -83 c75 -133 107 -202
	  144 -313 76 -227 113 -504 95 -709 -11 -129 -22 -162 -53 -170 -13 -3 -79 8
	  -148 25 -180 44 -346 57 -512 42 -391 -36 -722 -182 -985 -436 -127 -121 -202
	  -222 -330 -441 -128 -219 -125 -214 -146 -221 -19 -6 -117 25 -117 37 0 4 31
	  74 69 156 105 228 131 329 131 522 0 285 -97 490 -288 605 -106 64 -161 79
	  -292 79 -242 0 -400 -70 -640 -282 -131 -116 -126 -115 -222 -50 -141 96 -301
	  149 -447 149 -149 0 -282 -59 -429 -189 -138 -121 -222 -343 -222 -583 0 -252
	  114 -490 342 -714 119 -118 145 -140 250 -217 42 -31 79 -60 82 -65 2 -4 -40
	  -68 -94 -142 -113 -153 -210 -334 -265 -490 -124 -360 -161 -581 -173 -1041
	  l-7 -266 -58 -111 c-31 -61 -53 -113 -49 -116 5 -3 84 -10 177 -16 187 -12
	  221 -18 382 -60 132 -34 282 -91 451 -171 115 -54 145 -72 105 -63 -10 2 -124
	  20 -253 40 -431 65 -604 102 -807 170 -124 41 -331 129 -353 149 -9 8 -22 15
	  -28 15 -31 0 -272 159 -417 275 -109 87 -182 152 -385 346 -320 304 -440 388
	  -666 466 l-109 38 -255 0 c-281 0 -329 -7 -404 -56 -46 -31 -83 -76 -71 -87 4
	  -4 91 -10 193 -13 231 -7 271 -19 353 -107 100 -105 301 -342 297 -351 -2 -5
	  -70 -65 -153 -134 -82 -69 -173 -148 -202 -174 l-52 -48 125 -150 c247 -295
	  431 -531 443 -564 15 -45 14 -93 -1 -114 -12 -16 -23 -8 -113 75 -130 120
	  -231 222 -385 389 -163 177 -196 214 -250 279 -24 30 -70 82 -101 115 -31 33
	  -93 103 -139 155 -45 52 -96 111 -113 130 -115 128 -151 203 -151 310 0 134
	  52 233 175 337 118 99 303 173 435 173 61 0 65 1 75 28 13 33 27 452 17 502
	  -4 19 -14 67 -23 107 -16 67 -16 83 0 220 36 329 33 463 -16 643 l-20 76 71
	  179 c38 99 79 203 90 230 59 155 140 502 140 605 0 127 -57 257 -151 345 -78
	  71 -149 99 -241 92 -134 -9 -239 -92 -336 -264 -27 -48 -91 -151 -141 -227
	  -232 -354 -324 -622 -351 -1025 -6 -86 -20 -192 -31 -236 -11 -44 -64 -183
	  -118 -310 -158 -368 -167 -411 -158 -775 7 -256 13 -323 87 -995 27 -247 56
	  -531 65 -630 34 -396 51 -481 120 -612 83 -157 200 -293 370 -431 100 -80 329
	  -233 455 -303 316 -174 852 -364 1565 -554 266 -71 401 -110 450 -131 169 -70
	  387 -308 526 -571 l43 -83 1223 0 1222 0 10 38 c9 34 34 167 62 332 7 36 20
	  102 30 146 11 45 19 94 19 110 0 53 9 18 24 -101 14 -106 78 -461 92 -507 5
	  -17 72 -18 1227 -18 l1222 0 39 73 c104 191 147 250 285 387 184 184 210 196
	  641 310 835 220 1413 434 1767 653 122 76 350 248 443 335 152 141 272 346
	  309 527 11 55 32 231 46 390 25 278 37 396 105 985 36 316 50 606 40 865 -9
	  224 -11 233 -137 530 -146 341 -145 339 -163 595 -26 378 -123 656 -348 1003
	  -56 86 -125 196 -154 244 -58 99 -142 189 -208 224 -37 20 -60 24 -130 24 -74
	  0 -92 -4 -143 -29 -104 -53 -189 -164 -222 -293 -20 -77 -19 -142 5 -238 11
	  -44 31 -133 46 -198 31 -144 83 -297 176 -522 l70 -169 -21 -66 c-12 -36 -26
	  -89 -31 -119 -17 -92 -12 -333 11 -515 l21 -168 -23 -77 c-22 -70 -24 -93 -24
	  -286 1 -115 4 -240 9 -277 l8 -68 68 0 c124 0 311 -67 427 -153 130 -97 196
	  -215 197 -352 1 -70 -3 -88 -30 -145 -37 -78 -33 -72 -353 -436 -340 -388
	  -537 -599 -710 -760 -137 -128 -145 -134 -162 -118 -32 29 -25 93 16 154 56
	  84 164 219 235 295 36 39 74 83 83 98 10 15 63 84 117 152 55 68 100 127 100
	  132 0 17 -109 119 -248 233 -78 63 -141 118 -141 123 -1 4 74 93 165 197 158
	  182 169 191 242 227 l77 38 177 -3 c97 -1 179 2 182 6 3 5 -14 29 -37 55 -32
	  36 -57 52 -107 69 -58 20 -89 22 -302 26 -217 4 -243 2 -319 -18 -251 -65
	  -400 -163 -744 -493 -105 -100 -228 -215 -273 -255 -319 -280 -699 -481 -1100
	  -581 -167 -42 -288 -64 -622 -117 -429 -66 -704 -122 -813 -163 -23 -9 -27 -8
	  -27 7 0 14 -53 42 -221 117 -122 54 -230 106 -241 115 -20 16 -19 18 50 101
	  144 171 239 375 287 615 5 21 8 21 237 20 208 -1 244 2 338 22 216 47 396 113
	  542 198 245 144 409 309 568 573 167 277 226 478 237 801 13 371 -74 666 -290
	  991 l-18 27 93 40 c245 107 598 165 873 142 148 -12 300 -43 335 -68 16 -12
	  34 -45 50 -91 28 -82 51 -110 116 -141 90 -44 195 -12 258 79 85 123 4 288
	  -154 312 -57 8 -121 -10 -171 -51 l-39 -31 -123 30 c-177 43 -290 54 -495 48
	  -245 -7 -429 -47 -662 -144 -58 -23 -109 -43 -113 -43 -4 0 -58 51 -120 113
	  -62 62 -140 133 -175 158 -122 85 -248 160 -306 181 l-58 21 7 46 c20 137 23
	  180 20 336 -2 94 -7 184 -10 200 -3 17 -10 59 -16 95 -38 218 -119 434 -230
	  612 -49 77 -51 84 -40 113 53 129 29 223 -74 287 -67 41 -89 44 -157 21z
	  m-808 -5778 c51 -25 142 -73 202 -106 l109 -61 -93 -55 c-51 -30 -107 -65
	  -125 -79 -17 -13 -35 -24 -40 -24 -15 1 -203 333 -203 360 0 22 61 8 150 -35z
	  m-253 -147 c55 -84 153 -271 153 -294 0 -9 -27 -43 -59 -77 -150 -157 -305
	  -419 -377 -634 l-27 -82 -34 82 c-19 45 -46 111 -60 146 -43 104 -121 239
	  -199 342 -85 111 -250 274 -346 343 -38 26 -68 48 -68 49 0 1 80 2 178 2 157
	  1 190 4 296 29 135 31 239 67 371 125 50 22 98 40 107 40 10 1 36 -28 65 -71z"
              />
              <path
                d="M2445 7501 c-191 -70 -393 -215 -708 -511 -5 -4 17 -45 48 -89 114
	  -162 114 -248 0 -579 -25 -74 -87 -236 -138 -360 l-92 -227 1 -100 c1 -78 8
	  -127 32 -219 17 -66 35 -123 40 -128 16 -16 311 505 383 677 23 55 59 149 80
	  208 l37 108 172 182 c206 218 284 319 350 452 64 128 80 193 87 337 7 135 -6
	  184 -58 234 -27 26 -37 29 -107 31 -55 2 -92 -3 -127 -16z"
              />
              <path
                d="M10115 7511 c-28 -12 -51 -40 -71 -86 -26 -59 -23 -234 5 -340 56
	  -209 168 -372 457 -661 138 -138 140 -141 159 -210 30 -112 91 -259 174 -419
	  94 -183 278 -495 292 -495 15 0 26 37 63 219 l35 170 -70 163 c-96 223 -191
	  480 -234 627 -59 207 -46 295 64 440 22 30 41 57 41 61 0 7 -145 141 -240 221
	  -181 152 -367 268 -489 303 -58 17 -153 20 -186 7z"
              />
              <path
                d="M991 3711 c-46 -8 -81 -39 -81 -70 0 -27 53 -103 183 -265 152 -187
	  246 -286 272 -286 28 1 314 234 329 268 3 7 -16 35 -42 63 -26 27 -45 51 -43
	  52 3 1 -45 49 -105 107 -75 72 -122 110 -149 119 -46 15 -298 24 -364 12z"
              />
              <path
                d="M11410 3698 c-58 -18 -74 -29 -145 -102 -44 -45 -107 -117 -140 -160
	  l-60 -79 70 -65 c104 -97 257 -222 270 -222 20 0 297 344 403 502 l51 76 -19
	  25 c-15 18 -35 27 -89 35 -111 19 -265 14 -341 -10z"
              />
            </g>
          </svg>
        </a>
      </Link>

      <ul className="desktop-nav_list mb-4">
        <li className="dashboard-header nav_header">{translate("panel")}</li>
        <li
          className={`list_element ${
            router.pathname === "/sells" && "list-el-active"
          }`}
        >
          <Link href="/sells">
            <a>{translate("nv1")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === "/expenses" && "list-el-active"
          }`}
        >
          <Link href="/expenses">
            <a>{translate("nv2")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === "/production" && "list-el-active"
          }`}
        >
          <Link href="/production">
            <a>{translate("nv3")}</a>
          </Link>
        </li>
      </ul>
      <ul className="desktop-nav_list">
        <li className="right-header nav_header">{translate("anadir")}</li>
        <li
          className={`list_element ${
            router.pathname === CREATE_PRODUCT_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_PRODUCT_URL}>
            <a>{translate("nv4")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_EXPENSE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_EXPENSE_URL}>
            <a>{translate("nv5")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_SELL_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_SELL_URL}>
            <a>{translate("nv6")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_HIVE_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_HIVE_URL}>
            <a>{translate("nv7")}</a>
          </Link>
        </li>
        <li
          className={`list_element ${
            router.pathname === CREATE_HARVEST_URL && "list-el-active"
          }`}
        >
          <Link href={CREATE_HARVEST_URL}>
            <a>{translate("nv8")}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DesktopSidebar;
