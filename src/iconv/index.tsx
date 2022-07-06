/* tslint:disable */
// Utils
import { createNamespace, addUnit, isDefB } from '../utils';
import { emit, inherit } from '../utils/functional';

// Components
import Info from '../info';
import VanEmptyCol from '../emptycol'
import config from './config'

// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';
import encodeUrl from '../utils/encodeUrl';

!function (a) { let h; let l; let t; let o; let c; let e = '<svg><symbol id="h5-default" viewBox="0 0 1024 1024"><path d="M0 192a192 192 0 0 1 192-192h640a192 192 0 0 1 192 192v640a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192V192z" fill="#F7F8FA" ></path><path d="M843.008 144.832l-46.592 46.528 36.224 36.224 46.528-46.592-36.16-36.16zM703.36 284.48l46.528-46.592 36.224 36.224-46.528 46.528-36.224-36.16zM656.832 331.008l-46.592 46.528 36.224 36.224 46.528-46.528-36.16-36.224zM331.008 656.832l46.528-46.592 36.224 36.224-46.592 46.528-36.16-36.16zM284.416 703.36l-46.528 46.528 36.224 36.224 46.528-46.528-36.224-36.224zM144.832 843.008l46.528-46.528 36.224 36.16-46.592 46.592-36.16-36.224zM640 512a128 128 0 1 1-256 0 128 128 0 0 1 256 0z m-51.2 0a76.8 76.8 0 1 0-153.6 0 76.8 76.8 0 0 0 153.6 0zM879.168 843.008l-46.528-46.528-36.224 36.16 46.592 46.592 36.16-36.224zM739.584 703.36l46.528 46.528-36.224 36.224-46.528-46.528 36.224-36.224zM692.992 656.832l-46.528-46.592-36.224 36.224 46.592 46.528 36.16-36.16zM367.168 331.008l46.592 46.528-36.224 36.224-46.528-46.528 36.16-36.224zM320.64 284.48l-46.528-46.592-36.224 36.224 46.528 46.528 36.224-36.16zM180.992 144.832l46.592 46.528-36.224 36.224-46.528-46.592 36.16-36.16z" fill="#C3C3C3" ></path><path d="M0 192a192 192 0 0 1 192-192h640a192 192 0 0 1 192 192v640a192 192 0 0 1-192 192H192a192 192 0 0 1-192-192V192z m911.808-116.032A140.16 140.16 0 0 0 832 51.2H192a140.16 140.16 0 0 0-79.808 24.768l22.272 22.272-36.224 36.224-22.272-22.272A140.16 140.16 0 0 0 51.2 192v640c0 29.632 9.152 57.152 24.768 79.808l22.272-22.272 36.224 36.224-22.272 22.272A140.16 140.16 0 0 0 192 972.8h640a140.16 140.16 0 0 0 79.808-24.768l-22.272-22.272 36.224-36.224 22.272 22.272A140.16 140.16 0 0 0 972.8 832V192a140.16 140.16 0 0 0-24.768-79.808l-22.272 22.272-36.224-36.224 22.272-22.272z" fill="#C3C3C3" ></path></symbol><symbol id="h5-left-arrow" viewBox="0 0 1024 1024"><path d="M675.584 933.312a44.928 44.928 0 0 0 32.512 13.44c25.984 0 45.44-19.456 45.44-45.44a47.488 47.488 0 0 0-12.928-32.512L376.576 512.768l364.032-355.968a48.448 48.448 0 0 0 12.992-32.512 44.8 44.8 0 0 0-45.504-46.016 44.928 44.928 0 0 0-32.512 13.504L279.68 479.36a43.904 43.904 0 0 0-15.04 33.472 46.72 46.72 0 0 0 14.528 33.536l396.48 387.008z"  ></path></symbol><symbol id="h5-right-arrow" viewBox="0 0 1024 1024"><path d="M342.592 933.312a44.928 44.928 0 0 1-32.512 13.44 44.416 44.416 0 0 1-45.44-45.44c0-12.544 4.928-24 12.928-32.512l364.032-356.032L277.568 156.8a48.448 48.448 0 0 1-12.992-32.512 44.8 44.8 0 0 1 45.504-46.016c12.992 0 24 4.992 32.512 13.504l396.032 387.52c9.472 8 14.976 20.48 14.976 33.472a46.656 46.656 0 0 1-14.528 33.536l-396.48 387.008z"  ></path></symbol><symbol id="h5-top-arrow" viewBox="0 0 1024 1024"><path d="M88.32 679.04a44.864 44.864 0 0 0-13.44 32.512c0 25.984 19.456 45.44 45.44 45.44a47.488 47.488 0 0 0 32.512-12.928l356.032-364.032 355.968 364.032c8.512 8 20.48 12.992 32.512 12.992a44.8 44.8 0 0 0 46.016-45.504 44.864 44.864 0 0 0-13.504-32.512L542.336 283.008a43.904 43.904 0 0 0-33.472-14.976 46.72 46.72 0 0 0-33.536 14.528L88.32 679.04z"  ></path></symbol><symbol id="h5-bottom-arrow" viewBox="0 0 1024 1024"><path d="M88.32 346.048a44.864 44.864 0 0 1-13.44-32.512c0-25.984 19.456-45.44 45.44-45.44 12.544 0 24 4.928 32.512 12.928l356.032 364.032 355.968-364.032a48.448 48.448 0 0 1 32.512-12.992 44.8 44.8 0 0 1 46.016 45.504 44.864 44.864 0 0 1-13.504 32.512l-387.52 395.968a43.904 43.904 0 0 1-33.472 15.04 46.72 46.72 0 0 1-33.536-14.528L88.32 346.048z"  ></path></symbol><symbol id="h5-close" viewBox="0 0 1024 1024"><path d="M870.4 146.368a46.08 46.08 0 0 0-65.152 0L508.416 443.2 215.168 149.952a46.08 46.08 0 1 0-65.216 65.152l293.312 293.312-296.896 296.832A46.08 46.08 0 0 0 211.52 870.4l296.896-296.832 300.48 300.48a46.08 46.08 0 0 0 65.152-65.152L573.568 508.416l296.896-296.96a46.08 46.08 0 0 0 0-65.088z"  ></path></symbol><symbol id="h5-add" viewBox="0 0 1024 1024"><path d="M512 51.2a46.08 46.08 0 0 0-46.08 46.08v368.64H97.28a46.08 46.08 0 0 0 0 92.16h368.64v368.64a46.08 46.08 0 0 0 92.16 0V558.08h368.64a46.08 46.08 0 0 0 0-92.16H558.08V97.28A46.08 46.08 0 0 0 512 51.2z"  ></path></symbol><symbol id="h5-search" viewBox="0 0 1024 1024"><path d="M719.168 766.848a398.336 398.336 0 1 1 53.632-54.912l190.784 190.72a38.4 38.4 0 0 1-54.272 54.272l-190.144-190.08zM140.8 462.336a321.536 321.536 0 1 0 643.072 0 321.536 321.536 0 0 0-643.072 0z"  ></path></symbol><symbol id="h5-more" viewBox="0 0 1024 1024"><path d="M209.92 516.48a81.92 81.92 0 1 1-163.84 0 81.92 81.92 0 0 1 163.84 0zM593.92 516.48a81.92 81.92 0 1 1-163.84 0 81.92 81.92 0 0 1 163.84 0zM896 598.4a81.92 81.92 0 1 0 0-163.84 81.92 81.92 0 0 0 0 163.84z"  ></path></symbol><symbol id="h5-unfold" viewBox="0 0 1024 1024"><path d="M121.6 204.8a32 32 0 0 1 32-32h716.8a32 32 0 0 1 0 64H153.6a32 32 0 0 1-32-32zM121.6 498.944a32 32 0 0 1 32-32h716.8a32 32 0 0 1 0 64H153.6a32 32 0 0 1-32-32zM153.6 761.088a32 32 0 1 0 0 64h716.8a32 32 0 0 0 0-64H153.6z"  ></path></symbol><symbol id="h5-left-triangle" viewBox="0 0 1024 1024"><path d="M352 512l320-320v640l-320-320z"  ></path></symbol><symbol id="h5-right-triangle" viewBox="0 0 1024 1024"><path d="M672 512l-320-320v640l320-320z"  ></path></symbol><symbol id="h5-top-triangle" viewBox="0 0 1024 1024"><path d="M512 352l-320 320h640l-320-320z"  ></path></symbol><symbol id="h5-bottom-triangle" viewBox="0 0 1024 1024"><path d="M512 672l320-320H192l320 320z"  ></path></symbol><symbol id="h5-frontpage" viewBox="0 0 1024 1024"><path d="M371.2 635.52a32 32 0 0 0 0 64h289.536a32 32 0 1 0 0-64H371.2z"  ></path><path d="M512.832 96c-18.112 0-34.816 5.696-48.512 14.976H462.08l-8.64 8.576-317.696 270.464-0.896 0.96a152 152 0 0 0-45.248 101.76v351.488c0 53.632 43.712 97.344 97.344 97.344l651.648 0.128c53.632 0 97.344-43.712 97.344-97.344V492.736c0-9.152-2.56-59.136-45.248-101.76l-0.896-0.896-327.68-279.04h-0.768a85.952 85.952 0 0 0-48.512-15.04z m-15.488 70.272a22.464 22.464 0 0 1 15.488-6.272c5.76 0 11.2 2.24 15.488 6.272l9.216 8.704h1.024l307.712 262.08c12.16 12.48 18.56 25.856 22.016 36.608 3.456 10.944 3.648 18.752 3.648 19.072v351.616a33.536 33.536 0 0 1-33.344 33.344L186.88 877.568a33.536 33.536 0 0 1-33.344-33.28V492.672c0-0.32 0.192-8.128 3.648-19.072 3.392-10.752 9.856-24.128 22.016-36.608l307.84-262.08h1.024l9.216-8.704z"  ></path></symbol><symbol id="h5-avatar" viewBox="0 0 1024 1024"><path d="M320.384 380.48a194.88 194.88 0 1 1 389.76 0 194.88 194.88 0 0 1-389.76 0zM515.2 249.6a130.88 130.88 0 1 0 0 261.76 130.88 130.88 0 0 0 0-261.76z"  ></path><path d="M57.6 512a454.4 454.4 0 1 1 908.8 0A454.4 454.4 0 0 1 57.6 512zM512 121.6a390.4 390.4 0 0 0-309.888 627.84 431.808 431.808 0 0 1 625.472-7.552A390.4 390.4 0 0 0 512 121.6z m273.536 668.928a366.784 366.784 0 0 0-106.88-78.08 367.872 367.872 0 0 0-433.344 84.608A389.056 389.056 0 0 0 512 902.4a389.12 389.12 0 0 0 273.536-111.872z"  ></path></symbol><symbol id="h5-chat" viewBox="0 0 1024 1024"><path d="M704 588.032a32 32 0 0 1-32 32H320a32 32 0 0 1 0-64h352a32 32 0 0 1 32 32zM576 416a32 32 0 0 0 0-64H335.36a32 32 0 0 0 0 64H576z"  ></path><path d="M58.24 516.48c0-243.136 205.888-437.376 456.32-437.376 250.496 0 456.384 194.24 456.384 437.312a419.712 419.712 0 0 1-57.984 212.672l41.856 152.832a34.88 34.88 0 0 1-42.24 43.008l-153.984-38.912a469.76 469.76 0 0 1-244.032 67.712c-250.432 0-456.32-194.24-456.32-437.312z m456.32-367.552C299.52 148.928 128 314.944 128 516.48s171.52 367.488 386.56 367.488c81.536 0 156.8-24 219.008-64.64a34.944 34.944 0 0 1 27.648-4.608l110.464 27.968-30.08-109.632a34.944 34.944 0 0 1 4.224-27.904 350.72 350.72 0 0 0 55.296-188.672c0-201.472-171.52-367.488-386.56-367.488z"  ></path></symbol><symbol id="h5-cart" viewBox="0 0 1024 1024"><path d="M272.832 336.128a25.152 25.152 0 0 0-24.96 28.032v0.064l40.768 348.352a37.12 37.12 0 0 0 36.928 32.96h439.424c18.816 0 34.752-14.08 36.928-32.896l40.768-348.416V364.16a25.152 25.152 0 0 0-24.96-28.032H272.832z m-88.512 35.584a89.152 89.152 0 0 1 88.512-99.584h544.896c53.12 0 94.784 46.528 88.512 99.584l-40.768 348.288c-5.888 51.2-49.28 89.6-100.48 89.6H325.568c-51.456 0-94.592-38.464-100.48-89.6"  ></path><path d="M329.344 635.52a32 32 0 0 1 32-32h370.176a32 32 0 1 1 0 64H361.344a32 32 0 0 1-32-32zM52.288 205.184a32 32 0 0 1 32-32h113.28a32 32 0 0 1 31.808 28.352l38.592 335.744c4.736 41.024-58.88 48.32-63.616 7.36l-35.328-307.456H84.288a32 32 0 0 1-32-32zM305.472 920.32a55.872 55.872 0 1 0 0-111.808 55.872 55.872 0 0 0 0 111.744zM787.392 920.32a55.872 55.872 0 1 0 0-111.872 55.872 55.872 0 0 0 0 111.808z"  ></path></symbol><symbol id="h5-customer-service" viewBox="0 0 1024 1024"><path d="M512.448 134.4c144.64 0 267.136 101.056 300.032 236.224a126.08 126.08 0 0 0-112.512 125.056v126.976c0 33.92 13.632 64.832 35.648 87.488a310.016 310.016 0 0 1-120.64 78.208 103.744 103.744 0 0 0-58.752-18.176h-47.36c-57.472 0-104.32 46.912-104.32 104.384 0 57.536 46.848 104.448 104.32 104.448h47.36c57.344 0 104.128-46.72 104.448-104.256v-0.192c0-11.52-1.92-22.72-5.44-33.152a374.72 374.72 0 0 0 136.448-97.728c10.88 3.072 22.272 4.736 34.048 4.736h40.576A126.016 126.016 0 0 0 992 622.656V495.68a126.08 126.08 0 0 0-114.048-125.184C843.904 199.872 692.736 70.4 512.448 70.4c-180.48 0-331.968 129.664-365.632 300.672A126.08 126.08 0 0 0 38.4 495.68v126.976c0 69.248 56.512 125.76 125.696 125.76h40.576a126.016 126.016 0 0 0 125.696-125.76V495.68a126.08 126.08 0 0 0-117.824-125.504c32.896-134.912 155.328-235.712 299.904-235.712z m71.36 710.72c0.832 0.96 1.664 1.92 2.56 2.688a40.192 40.192 0 0 1-30.08 67.2h-47.36a40.64 40.64 0 0 1-40.448-40.448c0-22.144 18.24-40.384 40.448-40.384h47.36c10.56 0 20.288 4.16 27.52 10.944zM164.096 433.92h40.576c33.856 0 61.696 27.84 61.696 61.76v126.976c0 33.92-27.84 61.76-61.696 61.76h-40.576a62.016 62.016 0 0 1-61.696-61.76V495.68c0-33.92 27.84-61.76 61.696-61.76z m634.048 243.904a61.952 61.952 0 0 1-34.176-55.168V495.68c0-33.92 27.904-61.76 61.76-61.76h40.576c33.856 0 61.696 27.84 61.696 61.76v126.976c0 33.92-27.84 61.76-61.696 61.76h-40.576a60.992 60.992 0 0 1-27.52-6.592z"  ></path></symbol><symbol id="h5-calendar" viewBox="0 0 1024 1024"><path d="M694.08 532.736a32 32 0 0 0-45.12 3.008l-54.72 62.656-78.912 90.24a185.6 185.6 0 0 1-11.52 12.416 282.432 282.432 0 0 1-11.264-10.816L405.056 613.888a32 32 0 0 0-42.112 48.256l86.72 75.584c6.528 6.592 13.696 13.44 20.928 18.752a56.32 56.32 0 0 0 33.408 11.84 57.344 57.344 0 0 0 34.56-12.992c8.448-6.4 16.64-15.04 24.96-24.576l78.912-90.24 54.72-62.656a32 32 0 0 0-3.072-45.12z"  ></path><path d="M320 96a32 32 0 0 0-64 0v59.456h-63.232c-55.808 0-96.768 48.32-96.768 102.016v573.056c0 54.08 41.344 102.016 96.768 102.016h638.464c55.68 0 96.448-48.384 96.768-101.76V257.408c0-54.08-41.344-102.016-96.768-102.016H768V96a32 32 0 0 0-64 0v59.456H320V96z m384 128a32 32 0 0 0 64 0v-4.544h63.232c15.68 0 32.768 14.72 32.768 38.016V384h-704V257.472c0-23.232 17.024-38.016 32.768-38.016H256V224a32 32 0 0 0 64 0v-4.544h384V224z m-544 606.528V448h704v382.464c-0.192 23.424-17.344 38.08-32.768 38.08H192.768c-15.68 0-32.768-14.72-32.768-38.016z"  ></path></symbol><symbol id="h5-time" viewBox="0 0 1024 1024"><path d="M512 288a32 32 0 0 1 32 32v189.504l173.376 173.184a32 32 0 1 1-45.248 45.312L489.408 545.408a31.936 31.936 0 0 1-9.408-22.4V320a32 32 0 0 1 32-32z"  ></path><path d="M57.6 512a454.4 454.4 0 1 1 908.8 0A454.4 454.4 0 0 1 57.6 512zM512 121.6a390.4 390.4 0 1 0 0 780.8A390.4 390.4 0 0 0 512 121.6z"  ></path></symbol><symbol id="h5-countdown" viewBox="0 0 1024 1024"><path d="M537.792 420.48V294.72a32 32 0 0 0-64 0v125.568a106.816 106.816 0 1 0 64 0.32z m-32.448 59.008a42.752 42.752 0 1 1 0 85.504 42.752 42.752 0 0 1 0-85.504z"  ></path><path d="M825.472 54.144a32 32 0 1 0-45.312 45.312l12.736 12.672-43.264 43.264a434.688 434.688 0 1 0 50.368 40.128l38.144-38.144 13.184 13.248a32 32 0 1 0 45.248-45.312L825.472 54.144zM472.704 145.536l-0.128 9.024a32 32 0 0 0 64 1.152l0.128-10.24a370.752 370.752 0 0 1 338.24 344.32h-7.168a32 32 0 0 0-0.896 63.936l6.848 0.128a370.816 370.816 0 0 1-336 330.24l0.064-6.784a32 32 0 0 0-64-1.024l-0.064 7.936A370.816 370.816 0 0 1 136.512 554.88l8.704 0.128a32 32 0 1 0 0.832-64l-10.88-0.128a370.752 370.752 0 0 1 337.536-345.344z"  ></path></symbol><symbol id="h5-star" viewBox="0 0 1024 1024"><path d="M517.312 138.752l115.392 233.92a32 32 0 0 0 24.128 17.536l258.24 37.44-186.88 182.144a32 32 0 0 0-9.216 28.352l44.16 257.152-230.976-121.472a32 32 0 0 0-29.76 0L271.488 895.36l44.16-257.152a32 32 0 0 0-9.216-28.352l-186.88-182.144 258.24-37.44a32 32 0 0 0 24.064-17.536l115.456-233.92z m48.96-45.44a54.464 54.464 0 0 0-97.92 0l-116.48 235.968-260.288 37.76h-0.192a54.656 54.656 0 0 0-30.144 93.184v0.064l188.416 183.616-44.48 259.2c-8 45.184 39.488 78.464 79.104 57.728h0.064l232.96-122.496 232.896 122.432 0.064 0.064a54.592 54.592 0 0 0 79.168-57.408v-0.192l-44.544-259.328 188.416-183.616v-0.064a54.784 54.784 0 0 0-30.08-93.12l-260.544-37.824L566.336 93.44l-0.064-0.128z"  ></path></symbol><symbol id="h5-like" viewBox="0 0 1024 1024"><path d="M664.32 214.4c112.256 0 203.2 107.776 203.2 241.152 0 76.48-32.192 141.248-76.736 188.48-63.936 67.712-226.752 201.856-269.568 236.992a16.384 16.384 0 0 1-20.928 0c-42.816-35.136-205.632-169.28-269.568-236.992-44.48-47.232-76.672-112-76.672-188.48 0-133.12 90.88-241.216 203.136-241.216 50.112 0 96.512 21.76 132.032 57.472 11.52 11.52 30.528 11.52 41.792 0 35.968-35.712 83.2-57.472 133.376-57.472z m0-62.72c-51.2 0-101.504 17.152-144.384 47.872a16 16 0 0 1-19.008 0 243.2 243.2 0 0 0-143.744-47.68C210.56 151.68 91.328 287.936 91.328 455.552c0 85.248 33.28 167.36 93.824 231.488 75.904 80.512 277.568 244.352 286.08 251.2 11.52 9.408 25.536 14.08 39.552 14.08a62.144 62.144 0 0 0 39.488-14.08c8.576-6.848 210.24-170.688 286.08-251.2 60.608-64.128 93.824-146.24 93.824-231.488 0-167.68-119.296-303.872-265.792-303.872z"  ></path></symbol><symbol id="h5-notice" viewBox="0 0 1024 1024"><path d="M868.16 545.408c-31.296-60.48-66.56-128.704-75.136-206.208a288 288 0 0 0-576 0C211.2 418.176 176.32 487.552 145.536 548.864c-36.608 72.832-67.52 134.336-37.312 187.136 40.576 70.912 84.608 69.888 241.536 66.176 42.688-0.96 93.696-2.176 155.264-2.176 66.368 0 120.448 1.28 165.056 2.24 161.664 3.648 197.76 4.48 238.144-66.24 30.72-53.632-1.664-116.224-40.064-190.592zM728.96 339.2v3.584l0.384 3.52c10.048 90.112 51.072 169.152 81.92 228.544l10.368 20.16c16.832 33.024 27.712 57.088 32.448 76.992 4.224 17.92 1.92 26.24-1.472 32.256-10.496 18.304-16.576 23.424-20.16 25.6-3.776 2.432-12.032 6.208-35.392 8.192-24 2.048-56.32 1.728-105.344 0.64l-20.224-0.448c-44.544-1.024-99.392-2.24-166.528-2.24-62.4 0-114.176 1.216-156.8 2.24l-20.928 0.448c-47.36 1.088-79.616 1.408-104-0.64-23.936-1.984-33.792-5.888-38.976-8.96-4.416-2.56-10.816-7.936-20.48-24.832-3.52-6.08-5.76-14.464-1.536-32.448 4.672-20.032 15.488-44.16 32-77.44l8.704-17.344c30.336-60.032 71.04-140.672 77.824-233.088l0.192-2.368V339.2a224 224 0 0 1 448 0zM662.848 903.552a32 32 0 0 0-43.008-47.424c-16.768 15.232-56 29.824-107.136 29.824-51.328 0-90.368-14.464-107.072-29.696a32 32 0 1 0-43.2 47.168c33.216 30.464 90.816 46.528 150.272 46.528 59.648 0 117.056-16.448 150.144-46.4z"  ></path></symbol><symbol id="h5-sure" viewBox="0 0 1024 1024"><path d="M85.312 467.712l54.4-52.352 250.368 212.672s186.048-172.16 526.656-457.344l21.888 54.848s-283.84 274.24-549.888 566.4L85.312 467.648z"  ></path></symbol><symbol id="h5-info" viewBox="0 0 1024 1024"><path d="M516.864 622.336a32 32 0 0 1-32-32v-318.72a32 32 0 1 1 64 0v318.72a32 32 0 0 1-32 32zM516.864 688.64a51.2 51.2 0 1 0 0 102.4 51.2 51.2 0 0 0 0-102.4z"  ></path><path d="M512 57.6a454.4 454.4 0 1 0 0 908.8A454.4 454.4 0 0 0 512 57.6zM121.6 512a390.4 390.4 0 1 1 780.8 0A390.4 390.4 0 0 1 121.6 512z"  ></path></symbol><symbol id="h5-help" viewBox="0 0 1024 1024"><path d="M530.048 690.368a47.104 47.104 0 1 0-36.032 87.04 47.104 47.104 0 0 0 36.032-87.04zM628.864 294.208C600.96 268.48 564.416 256 518.208 256c-51.456 0-91.84 15.808-120.576 47.552-28.544 29.888-42.496 69.888-42.496 120.32l4.736 4.736h55.104l4.736-4.672c0-33.088 7.36-58.624 22.016-77.312 15.808-21.696 40.064-32.32 73.728-32.32 28.672 0 50.112 7.488 64.96 22.912 14.72 14.72 22.4 35.328 22.4 61.632 0 18.304-6.528 35.456-19.904 52.16-3.456 4.544-8.256 9.6-23.296 24.704-37.888 33.664-61.376 60.608-71.424 82.304-8.704 18.048-13.056 39.04-13.056 62.656v16l4.736 4.736h55.808l4.736-4.736v-16c0-18.176 4.096-34.112 12.544-48.512a139.52 139.52 0 0 1 31.808-37.184c29.696-26.304 49.536-45.248 57.088-54.272 18.368-24.256 27.648-52.544 27.648-84.672 0-42.88-13.696-77.056-40.64-101.824z"  ></path><path d="M512 57.6a454.4 454.4 0 1 0 0 908.8A454.4 454.4 0 0 0 512 57.6zM121.6 512a390.4 390.4 0 1 1 780.8 0A390.4 390.4 0 0 1 121.6 512z"  ></path></symbol><symbol id="h5-success" viewBox="0 0 1024 1024"><path d="M752.96 364.8a32.128 32.128 0 0 0-45.44 0l-256 256-127.36-127.36a32.128 32.128 0 1 0-45.44 45.44L428.8 689.024a32.128 32.128 0 0 0 45.44 0l278.784-278.72a32.128 32.128 0 0 0 0-45.44z"  ></path><path d="M57.6 512a454.4 454.4 0 1 1 908.8 0A454.4 454.4 0 0 1 57.6 512zM512 121.6a390.4 390.4 0 1 0 0 780.8A390.4 390.4 0 0 0 512 121.6z"  ></path></symbol><symbol id="h5-fail" viewBox="0 0 1024 1024"><path d="M335.808 335.808a32 32 0 0 1 45.248 0l131.712 131.648 131.712-131.712a32 32 0 1 1 45.248 45.312L558.016 512.64l131.776 131.84a32 32 0 1 1-45.248 45.184L512.64 558.08l-131.712 131.712a32 32 0 0 1-45.248-45.248l131.776-131.776-131.712-131.648a32 32 0 0 1 0-45.248z"  ></path><path d="M57.6 512a454.4 454.4 0 1 1 908.8 0A454.4 454.4 0 0 1 57.6 512zM512 121.6a390.4 390.4 0 1 0 0 780.8A390.4 390.4 0 0 0 512 121.6z"  ></path></symbol><symbol id="h5-increase" viewBox="0 0 1024 1024"><path d="M511.936 288a32 32 0 0 1 32 32v160h160a32 32 0 1 1 0 64H544V704a32 32 0 1 1-64 0V544h-160a32 32 0 0 1 0-64h160V320a32 32 0 0 1 32-32z"  ></path><path d="M512 57.6a454.4 454.4 0 1 0 0 908.8A454.4 454.4 0 0 0 512 57.6zM121.6 512a390.4 390.4 0 1 1 780.8 0A390.4 390.4 0 0 1 121.6 512z"  ></path></symbol><symbol id="h5-decrease" viewBox="0 0 1024 1024"><path d="M320 480a32 32 0 0 0 0 64h384a32 32 0 1 0 0-64H320z"  ></path><path d="M512 57.6a454.4 454.4 0 1 0 0 908.8A454.4 454.4 0 0 0 512 57.6zM121.6 512a390.4 390.4 0 1 1 780.8 0A390.4 390.4 0 0 1 121.6 512z"  ></path></symbol><symbol id="h5-scan" viewBox="0 0 1024 1024"><path d="M197.44 160a37.696 37.696 0 0 0-37.44 37.44v132.48a32 32 0 0 1-64 0v-132.48c0-55.872 45.568-101.44 101.44-101.44H371.84a32 32 0 1 1 0 64H197.44zM128 665.024a32 32 0 0 1 32 32v129.472c0 20.48 16.96 37.44 37.44 37.44h178.048a32 32 0 0 1 0 64H197.44A101.696 101.696 0 0 1 96 826.496V696.96a32 32 0 0 1 32-32zM928 685.184a32 32 0 1 0-64 0v141.376c0 20.48-16.96 37.44-37.44 37.44h-164.48a32 32 0 1 0 0 64h164.48c55.808 0 101.44-45.632 101.44-101.44v-141.44zM630.016 128a32 32 0 0 1 32-32h164.48c55.872 0 101.504 45.568 101.504 101.44v140.672a32 32 0 1 1-64 0V197.44a37.696 37.696 0 0 0-37.44-37.44h-164.48a32 32 0 0 1-32-32zM74.688 490.688a32 32 0 1 0 0 64h874.624a32 32 0 0 0 0-64H74.688z"  ></path></symbol><symbol id="h5-contact" viewBox="0 0 1024 1024"><path d="M518.4 71.168A241.664 241.664 0 0 0 386.24 515.2a431.872 431.872 0 0 0-299.456 411.008 32 32 0 1 0 64 0 367.68 367.68 0 0 1 605.888-279.808 32 32 0 1 0 41.6-48.64 428.672 428.672 0 0 0-147.712-82.56A241.664 241.664 0 0 0 518.4 71.168zM340.736 312.832a177.664 177.664 0 1 1 355.328 0 177.664 177.664 0 0 1-355.328 0zM702.208 764.928a32 32 0 0 1 32-32h185.856a32 32 0 1 1 0 64h-185.856a32 32 0 0 1-32-32zM628.224 879.616a32 32 0 0 0 0 64h291.84a32 32 0 1 0 0-64h-291.84z"  ></path></symbol><symbol id="h5-password" viewBox="0 0 1024 1024"><path d="M758.144 275.712c3.008 20.352-13.952 37.12-34.56 37.12-20.672 0-36.928-16.832-41.28-36.992a174.272 174.272 0 0 0-340.544 0c-4.416 20.16-20.672 37.056-41.344 37.056-20.608 0-37.568-16.832-34.56-37.184a248.96 248.96 0 0 1 492.288 0zM512 760.896a37.312 37.312 0 0 1-37.312-37.312V599.04a37.312 37.312 0 0 1 74.688 0v124.48a37.312 37.312 0 0 1-37.376 37.312z"  ></path><path d="M263.104 362.688A149.312 149.312 0 0 0 113.792 512v298.688A149.312 149.312 0 0 0 263.04 960h497.792a149.312 149.312 0 0 0 149.312-149.312V512a149.312 149.312 0 0 0-149.312-149.312H263.04zM835.584 512v298.688c0 41.216-33.472 74.624-74.688 74.624H263.04a74.688 74.688 0 0 1-74.624-74.624V512c0-41.216 33.408-74.688 74.624-74.688h497.792c41.216 0 74.688 33.472 74.688 74.688z"  ></path></symbol><symbol id="h5-hidden" viewBox="0 0 1024 1024"><path d="M523.52 665.472a387.968 387.968 0 0 0 122.368-29.76l42.56 77.44a31.04 31.04 0 0 0 54.4-29.952l-41.984-76.224a391.04 391.04 0 0 0 86.528-74.304l47.872 47.808a31.04 31.04 0 0 0 43.904-43.84l-54.656-54.656c12.672-20.544 23.488-42.368 32.128-65.216a31.04 31.04 0 0 0-57.984-22.08 325.76 325.76 0 0 1-610.496-4.16 31.04 31.04 0 1 0-58.24 21.312c8.704 23.872 19.648 46.72 32.704 68.224l-56.576 56.576a31.04 31.04 0 1 0 43.904 43.904l49.536-49.6A387.84 387.84 0 0 0 285.184 605.44l-0.128 0.256-42.688 77.568a31.04 31.04 0 1 0 54.4 29.888l42.688-77.568 0.512-0.96c38.528 16.64 79.616 27.072 121.6 30.592v95.04a31.04 31.04 0 1 0 62.08 0v-93.12l-0.064-1.664z"  ></path></symbol><symbol id="h5-visible" viewBox="0 0 1024 1024"><path d="M672 512a160 160 0 1 1-320 0 160 160 0 0 1 320 0z m-64 0a96 96 0 1 0-192 0 96 96 0 0 0 192 0z"  ></path><path d="M960 512c0 80-128 320-432 320S96 592 96 512 256 192 528 192 960 432 960 512z m-64 0c0 0.128 0-1.152-0.64-4.16a91.712 91.712 0 0 0-3.264-11.712 220.288 220.288 0 0 0-16.96-36.16 406.848 406.848 0 0 0-73.088-91.52C737.024 307.072 644.096 256 528 256s-209.024 51.008-274.048 112.512c-32.512 30.72-57.024 63.296-73.088 91.456-8.064 14.08-13.568 26.368-16.96 36.16a92.8 92.8 0 0 0-3.328 11.712A28.608 28.608 0 0 0 160 512c0 6.208 3.584 26.048 18.048 55.296 13.76 27.712 35.264 59.52 65.216 89.472C302.336 715.84 394.496 768 528 768s225.664-52.16 284.8-111.232a346.88 346.88 0 0 0 65.152-89.472C892.416 538.048 896 518.208 896 512z"  ></path></symbol><symbol id="h5-wifi" viewBox="0 0 1024 1024"><path d="M75.264 444.992a32 32 0 0 1 0-45.312 629.184 629.184 0 0 1 889.792 0 32 32 0 0 1-45.248 45.312 565.248 565.248 0 0 0-799.296 0 32 32 0 0 1-45.248 0z"  ></path><path d="M207.232 531.52a32 32 0 1 0 45.248 45.248 378.56 378.56 0 0 1 535.36 0 32 32 0 1 0 45.248-45.248 442.624 442.624 0 0 0-625.92 0z"  ></path><path d="M339.2 663.552a32 32 0 1 0 45.184 45.248 192 192 0 0 1 271.488 0 32 32 0 0 0 45.248-45.248 255.936 255.936 0 0 0-361.984 0zM559.744 857.728a56 56 0 1 0-79.168-79.168 56 56 0 0 0 79.168 79.168z"  ></path></symbol><symbol id="h5-program" viewBox="0 0 1024 1024"><path d="M296 400a104 104 0 1 0 0-208 104 104 0 0 0 0 208z m0 64a168 168 0 1 1 0-336 168 168 0 0 1 0 336z m0 367.936a104 104 0 1 0 0-208 104 104 0 0 0 0 208z m0 64a168 168 0 1 1 0-336 168 168 0 0 1 0 336z m328.32-599.936a104 104 0 1 1 208 0 104 104 0 0 1-208 0z m-64 0a168 168 0 1 0 336 0 168 168 0 0 0-336 0z m168 535.936a104 104 0 1 0 0-208 104 104 0 0 0 0 208z m0 64a168 168 0 1 1 0-336 168 168 0 0 1 0 336z"  ></path></symbol><symbol id="h5-image" viewBox="0 0 1024 1024"><path d="M408 336a104 104 0 1 1-208 0 104 104 0 0 1 208 0z m-64 0a40 40 0 1 0-80 0 40 40 0 0 0 80 0z"  ></path><path d="M928 506.304V768a96 96 0 0 1-96 96H192A96 96 0 0 1 96 768V224A96 96 0 0 1 192 128h640a96 96 0 0 1 96 96v282.304zM192 192a32 32 0 0 0-32 32v415.68L264.128 540.8a64 64 0 0 1 85.952-1.984l82.816 71.68 255.808-232.576a64 64 0 0 1 80.896-4.288l94.4 69.12V224A32 32 0 0 0 832 192H192z m289.664 460.672l170.24 147.328H832a32 32 0 0 0 32-32V522.112l-132.224-96.832-250.112 227.392z m-173.44-65.472L160 727.936V768a32 32 0 0 0 32 32h362.112L308.224 587.2z"  ></path></symbol><symbol id="h5-photo" viewBox="0 0 1024 1024"><path d="M298.24 541.76a215.04 215.04 0 1 1 430.016 0 215.04 215.04 0 0 1-430.08 0z m215.04-151.04a151.04 151.04 0 1 0 0 302.08 151.04 151.04 0 0 0 0-302.08zM754.176 288.64a32 32 0 1 0 0 64h26.176a32 32 0 1 0 0-64h-26.24z"  ></path><path d="M92.032 257.664c0-53.632 43.584-97.664 97.664-97.664h647.296c53.696 0 97.728 43.648 97.728 97.664v537.792a98.112 98.112 0 0 1-97.728 97.472H189.696a97.792 97.792 0 0 1-97.664-97.664v-537.6zM189.632 224a33.792 33.792 0 0 0-33.664 33.664v537.6c0 18.56 15.168 33.664 33.664 33.664h647.296a34.112 34.112 0 0 0 33.728-33.792V257.664a33.792 33.792 0 0 0-33.728-33.664H189.696z"  ></path></symbol><symbol id="h5-location" viewBox="0 0 1024 1024"><path d="M290.112 212.608c-55.552 51.072-91.072 125.76-91.072 220.8 0 76.672 50.688 157.888 123.136 241.28 35.52 40.96 74.752 80.64 112.896 119.232l2.432 2.496c25.856 26.112 51.328 51.84 74.24 76.672 24.064-26.624 50.944-53.76 78.016-80.896l6.528-6.592a2546.368 2546.368 0 0 0 106.368-111.168C774.656 592.64 824.96 512.96 824.96 433.28c0-94.976-35.52-169.664-91.072-220.736-55.808-51.2-133.888-80.448-221.888-80.448s-166.08 29.184-221.888 80.448z m-49.088-49.216C311.296 98.816 407.488 64 512 64s200.704 34.816 270.976 99.392C853.568 228.224 896 321.152 896 433.344c0 105.728-65.856 201.92-139.136 285.056-34.88 39.616-72.96 77.824-108.8 113.92l-6.976 6.912c-38.272 38.464-73.408 74.176-101.248 107.84a36.096 36.096 0 0 1-27.584 12.928 36.096 36.096 0 0 1-27.776-12.544c-27.264-32.128-61.824-67.072-99.712-105.344l-1.28-1.28c-37.888-38.4-78.656-79.68-115.904-122.56C194.368 633.984 128 536.32 128 433.344c0-112.192 42.432-205.12 113.024-269.952z"  ></path><path d="M513.728 296.256c-64 0-115.84 49.728-115.84 111.04 0 61.376 51.84 111.104 115.84 111.104s115.776-49.728 115.776-111.104c0-61.312-51.84-111.04-115.84-111.04zM326.912 407.296c0-98.944 83.648-179.2 186.816-179.2s186.816 80.256 186.816 179.2c0 99.008-83.648 179.2-186.88 179.2-103.104 0-186.752-80.192-186.752-179.2z"  ></path></symbol><symbol id="h5-file" viewBox="0 0 1024 1024"><path d="M320 280a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64H320zM288 648a32 32 0 0 1 32-32h216a32 32 0 0 1 0 64H320a32 32 0 0 1-32-32zM320 448a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64H320z"  ></path><path d="M265.6 960h414.4l224-280v-470.4A145.6 145.6 0 0 0 758.4 64h-492.8a145.6 145.6 0 0 0-145.6 145.6v604.8A145.6 145.6 0 0 0 265.6 960z m574.4-750.4v438.4H736c-48.64 0-88 39.424-88 88V896H265.6c-45.056 0-81.6-36.48-81.6-81.6v-604.8C184 164.544 220.48 128 265.6 128h492.8c45.056 0 81.6 36.48 81.6 81.6z m-43.52 502.4l-84.48 105.6V736c0-13.248 10.752-24 24-24h60.416z"  ></path></symbol><symbol id="h5-edit" viewBox="0 0 1024 1024"><path d="M203.264 134.4c-25.728 0-43.264 19.264-43.264 38.656v677.376c0 19.392 17.536 38.656 43.264 38.656h635.392c25.728 0 43.264-19.264 43.264-38.656v-546.56a32 32 0 0 1 64 0v546.56c0 58.432-50.048 102.656-107.264 102.656H203.264c-57.216 0-107.264-44.16-107.264-102.656V173.056c0-58.432 50.048-102.656 107.264-102.656h509.696a32 32 0 0 1 0 64H203.264z"  ></path><path d="M276.736 302.592a32 32 0 0 1 32-32h147.456a32 32 0 0 1 0 64H308.736a32 32 0 0 1-32-32zM308.736 483.584a32 32 0 1 0 0 64h417.536a32 32 0 1 0 0-64H308.736zM276.736 728.576a32 32 0 0 1 32-32h417.536a32 32 0 1 1 0 64H308.736a32 32 0 0 1-32-32zM905.6 156.8a32 32 0 0 0-45.248-45.312l-241.92 241.92a32 32 0 1 0 45.248 45.312l241.92-241.92z"  ></path></symbol><symbol id="h5-message" viewBox="0 0 1024 1024"><path d="M358.144 473.792a42.688 42.688 0 1 1-85.376 0 42.688 42.688 0 0 1 85.376 0zM563.584 473.792a42.688 42.688 0 1 1-85.376 0 42.688 42.688 0 0 1 85.376 0zM726.528 516.48a42.688 42.688 0 1 0 0-85.44 42.688 42.688 0 0 0 0 85.44z"  ></path><path d="M192.192 147.2c-52.928 0-96.192 43.264-96.192 96.192v464.256c0 52.928 43.264 96.192 96.192 96.192h386.112l139.84 116.352a32 32 0 0 0 52.48-24.576l0.128-91.776h72.064c52.928 0 96.192-43.264 96.192-96.192V243.392c0-53.12-43.264-96.192-96-96.192H192.192zM160 243.392c0-17.6 14.592-32.192 32.192-32.192h650.88c17.344 0 31.936 14.336 31.936 32.192v464.256a32.384 32.384 0 0 1-32.192 32.192h-104a32 32 0 0 0-32 32l-0.128 55.552-96.32-80.128a32 32 0 0 0-20.48-7.424H192.192a32.384 32.384 0 0 1-32.192-32.192V243.392z"  ></path></symbol><symbol id="h5-download" viewBox="0 0 1024 1024"><path d="M544.192 613.568l122.24-122.24a30.976 30.976 0 0 1 43.776 43.776L535.04 710.208a30.976 30.976 0 0 1-43.776 0L316.288 535.04a30.976 30.976 0 1 1 43.712-43.776l122.24 122.24V327.936a30.976 30.976 0 1 1 61.952 0v285.696z"  ></path><path d="M57.6 512a454.4 454.4 0 1 1 908.8 0A454.4 454.4 0 0 1 57.6 512zM512 121.6a390.4 390.4 0 1 0 0 780.8A390.4 390.4 0 0 0 512 121.6z"  ></path></symbol><symbol id="h5-link" viewBox="0 0 1024 1024"><path d="M463.36 827.584c-77.696 77.696-204.224 74.624-282.624-3.84-78.464-78.4-81.536-204.928-3.84-282.624l71.872-71.872a32 32 0 1 1 45.248 45.248L222.144 586.368c-51.328 51.328-50.944 137.344 3.84 192.192 54.784 54.784 140.8 55.104 192.128 3.776l142.4-142.4c47.488-47.488 41.28-129.408-16.832-172.416A32 32 0 0 1 581.76 416c87.68 64.896 100.8 192.384 24 269.12L463.36 827.584zM435.84 575.36c-87.616-64.832-100.736-192.32-24-269.12L554.24 163.776c77.696-77.632 204.224-74.624 282.688 3.84 78.4 78.4 81.472 204.928 3.776 282.624l-71.872 71.872a32 32 0 1 1-45.248-45.248l71.872-71.872c51.328-51.328 51.008-137.344-3.84-192.128-54.784-54.784-140.8-55.168-192.128-3.84L457.152 351.424c-47.488 47.488-41.344 129.408 16.768 172.48a32 32 0 0 1-38.08 51.392z"  ></path></symbol><symbol id="h5-qrcode" viewBox="0 0 1024 1024"><path d="M569.344 89.024h338.688c10.56 0 19.072 8.576 19.072 19.2v338.688a19.136 19.136 0 0 1-19.072 19.136H569.344a19.136 19.136 0 0 1-19.072-19.136V108.16c0-10.56 8.512-19.136 19.072-19.136z m272.128 272.128V193.792a19.136 19.136 0 0 0-19.072-19.136h-167.36a19.136 19.136 0 0 0-19.2 19.2v167.296c0 10.56 8.576 19.136 19.2 19.136h167.36a19.136 19.136 0 0 0 19.072-19.136zM108.032 89.088h338.88c10.56 0 19.008 8.384 19.008 19.008v338.944a19.008 19.008 0 0 1-19.008 19.008H108.032a19.008 19.008 0 0 1-19.008-19.008V108.16c0-10.496 8.448-19.008 19.008-19.008z m272.256 272.192V193.92a19.008 19.008 0 0 0-19.008-19.008H193.664a19.008 19.008 0 0 0-19.008 19.008v167.424c0 10.496 8.448 19.008 19.008 19.008h167.616a19.008 19.008 0 0 0 19.008-19.008zM108.032 549.568h339.008c10.432 0 18.88 8.576 19.008 19.008v339.072a19.072 19.072 0 0 1-19.008 19.008H108.032a19.072 19.072 0 0 1-19.008-18.944v-339.2c0-10.368 8.576-18.944 19.008-18.944z m272.256 272.384v-167.68a19.072 19.072 0 0 0-19.008-18.944H193.664a19.072 19.072 0 0 0-19.008 19.008v167.616c0 10.432 8.576 18.944 19.008 18.944h167.616a19.072 19.072 0 0 0 19.008-18.944z"  ></path><path d="M851.776 738.432h56c10.624 0 19.008 8.576 19.008 19.136v150.144a19.072 19.072 0 0 1-19.008 19.008H757.76a19.072 19.072 0 0 1-19.008-19.008v-56.192c0-10.432 8.512-19.008 19.008-19.008h75.008v-75.072c0-10.432 8.576-19.008 19.072-19.008zM738.688 663.36v150.144a19.008 19.008 0 0 1-19.008 19.008h-56.064a19.008 19.008 0 0 1-19.008-19.008v-150.144c0-10.432 8.448-19.008 19.008-19.008h56.064c10.432 0 19.008 8.448 19.008 19.008zM625.6 643.648h-56.192a19.008 19.008 0 0 1-19.008-18.88v-56.192c0-10.56 8.576-19.008 19.008-19.008h56.192c10.56 0 19.008 8.576 19.008 19.008v56.192a18.944 18.944 0 0 1-19.008 18.88zM851.776 549.568h56.128c10.496 0 18.88 8.576 19.008 19.008v56.192a19.072 19.072 0 0 1-19.008 19.008h-56.128a19.072 19.072 0 0 1-19.008-19.008v-56.192c0-10.432 8.512-19.008 18.944-19.008zM569.792 832.512h55.552c10.56 0 19.2 8.704 19.2 19.2v55.68a19.2 19.2 0 0 1-19.2 19.2h-55.552a19.2 19.2 0 0 1-19.264-19.2v-55.68a19.2 19.2 0 0 1 19.2-19.2z"  ></path></symbol></svg>'; var d = (d = document.getElementsByTagName("script"))[d.length - 1].getAttribute("data-injectcss"); const i = function (a, h) { h.parentNode.insertBefore(a, h) }; if (d && !a.__iconfont__svg__cssinject__) { a.__iconfont__svg__cssinject__ = !0; try { document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>") } catch (a) { console && console.log(a) } } function z() { c || (c = !0, t()) } function p() { try { o.documentElement.doScroll("left") } catch (a) { return void setTimeout(p, 50) } z() } h = function () { let a; let h; (h = document.createElement("div")).innerHTML = e, e = null, (a = h.getElementsByTagName("svg")[0]) && (a.setAttribute("aria-hidden", "true"), a.style.position = "absolute", a.style.width = 0, a.style.height = 0, a.style.overflow = "hidden", h = a, (a = document.body).firstChild ? i(h, a.firstChild) : a.appendChild(h)) }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(h, 0) : (l = function () { document.removeEventListener("DOMContentLoaded", l, !1), h() }, document.addEventListener("DOMContentLoaded", l, !1)) : document.attachEvent && (t = h, o = a.document, c = !1, p(), o.onreadystatechange = function () { o.readyState == "complete" && (o.onreadystatechange = null, z()) }) }(window);

export type IconProps = {
  text?: string;
  dot?: boolean;
  tag: keyof HTMLElementTagNameMap | string;
  name?: string;
  size?: string | number;
  info?: string | number;
  badge?: string | number;
  color?: string;
  classPrefix: string;
  notext?: boolean;
  href?: string,
  target?: { type: string, default: '_self' },
  to?: [string, Object],
  replace?: { type: boolean, default: false },
  append?: { type: boolean, default: false },
  decoration?: { type: boolean, default: true },
  download?: { type: boolean, default: false },
  destination?: string,
};

export type IconEvents = {
  onClick?(event: Event): void;
};

const [createComponent, bem] = createNamespace('iconv');

function isImage(name?: string): boolean {
  return name ? name.indexOf('/') !== -1 : false;
}

// compatible with legacy usage, should be removed in next major version
const LEGACY_MAP: Record<string, string> = {
  medel: 'medal',
  'medel-o': 'medal-o',
  'calender-o': 'calendar-o',
};

function correctName(name?: string) {
  return (name && LEGACY_MAP[name]) || name;
}

function getName(name = '默认') {
  const item = config.glyphs.find((v) => v.font_class === name) || { font_class: 'default' };
  return item.font_class;
}

function Iconv(
  h: CreateElement,
  props: IconProps,
  slots: DefaultSlots,
  ctx: RenderContext<IconProps>
) {
  const name = getName((props.name));
  const imageIcon = isImage(name);

  if (process.env.NODE_ENV === 'development' && props.info) {
    console.warn(
      '[Vant] Icon: "info" prop is deprecated, use "badge" prop instead.'
    );
  }

  function currentHref() {
    if (props.href !== undefined)
      return props.href;
    if (props.destination !== undefined && props.destination !== "")
      return props.destination;
    if (ctx.parent?.$router && props.to !== undefined)
      // @ts-ignore：没办法
      return ctx.parent?.$router.resolve(props.to, ctx.parent?.$route, props.append).href;
    return undefined;
  }

  function onClick(event: Event) {
    emit(ctx, 'click', event);
    const hrefR = encodeUrl(currentHref());
    console.log(hrefR, ctx, event)
    // @ts-ignore：没办法
    // if (props.target !== '_self')
    //   return;

    if (hrefR === undefined) {
      let to;
      if (props.destination) {
        // 只处理/a/b形式的链接
        const { origin } = window.location;
        const path = window.location.href.replace(origin, '').split('/');
        const destination = props.destination.replace(origin, '').split('/');
        if (path[1] === destination[1]) {
          to = encodeUrl('/' + destination.slice(2).join('/'));
        } else {
          return;
        }
      }

      const currentTo = to || props.to;
      if (currentTo === undefined)
        return;
      const cancel = false;
      if (cancel)
        return;
      const $router = ctx.parent?.$router;
      const $route = ctx.parent?.$route;
      const { location } = $router.resolve(
        // @ts-ignore：没办法
        currentTo,
        $route,
        props.append,
      );
      props.replace ? $router.replace(location) : $router.push(location);
    } else {
      function downloadClick() {
        const a = document.createElement("a");
        a.setAttribute("href", hrefR as string);
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 500);
      }
      downloadClick();
    }

  }
  function ifDesigner() {
    return ctx?.parent?.$env && ctx.parent?.$env.VUE_APP_DESIGNER;
  }
  const sd = slots.default && slots.default();
  const sid = ctx.parent.$options._scopeId;
  const href = { attrs: { 'xlink:href': `#h5-${name}` } };
  const ifNotext = props.notext;
  return (
    <props.tag
      class={[
        props.classPrefix,
        // imageIcon ? '' : `${props.classPrefix}-${name}`,
      ]}
      // style={{
      //   color: props.color,
      //   // fontSize: addUnit(props.size),
      // }}
      {...inherit(ctx, false)}
      onClick={onClick}
    >
      <svg class="vant-iconv-svg van-shoud-pa" aria-hidden="true">
        <use {...href} class="van-shoud-pa"></use>
      </svg>
      {ifDesigner() && !sd && !ifNotext ? <VanEmptyCol vusion-slot-name="default" class="van-shoud-pa" vusion-scope-id={sid}></VanEmptyCol> : null}
      <div class={bem('slot')}>{sd}</div>
      {/* {imageIcon && <img class={bem('image')} src={name} />} */}
      <Info dot={props.dot} info={props.badge ?? props.info} />
    </props.tag>
  );
}

Iconv.props = {
  text: {
    type: String,
    default: '图标'
  },
  dot: Boolean,
  name: String,
  size: [Number, String],
  // @deprecated
  // should be removed in next major version
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i',
  },
  classPrefix: {
    type: String,
    default: bem(),
  },
  notext: Boolean,
  href: String,
  target: { type: String, default: '_self' },
  to: [String, Object],
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  decoration: { type: Boolean, default: true },
  download: { type: Boolean, default: false },
  destination: String,
};

export default createComponent<IconProps, IconEvents>(Iconv);
