1. remove style include from js
2. js resolving paths
3. relative path to js in html
4. Review next diff:

// export const ENV_STATUS = {
// projectDevStatus: process.env.NODE_ENV === `development`,
// projectStagingStatus: process.env.STAGING === `true`,
// };

/// ../../node_modules path
// if environment === 'development'
// - need for parcel rebuild in dev mode
// object(data=`${assetsImage}icons/sprite-icons/${name}.svg` type="image/svg+xml" style="display: none")
// - need for parcel rebuild in dev mode#

5. Check

## / ../../node_modules path

6. Check next diff:
   //- works
   mixin icon(name, mod) - mod = mod || 'icon--size_mod';
   span.icon(class=mod data-sprite-icon=name) - const svgInline = readFileSync(`./src/images/icons/sprite-icons/${name}.svg`, "utf-8");
   != svgInline

---

7.  Check next diff:
    mixin dev_widget
    if sitemap && (environment === 'development' || process.env.STAGING === 'true')
    style.
    body {position:relative}
    .widget_wrap{position:absolute;top:100px;left:0;z-index:9999;padding:10px 20px;background:#222;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}
    .widget_wrap:after{content:"Navigation menu";color:white;position:absolute;top:0;left:100%;width:auto;height:auto;padding:10px;text-transform:uppercase;background:#222;cursor:pointer}
    .widget_wrap:hover,
    .widget_wrap:active,
    .widget_wrap:focus {-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}
    .widget_item{padding:0 0 10px}
    .widget_link{color:#fff;text-decoration:none;font-size:15px;}
    .widget_link:hover{text-decoration:underline}

        	.widget_wrap
        		ul.widget_list
        			each item in sitemap
        				li.widget_item
        					a.widget_link(href=item)= item.replace(/\.html$/, '')

---

8. Check next diff:
   mixin no_use(array)
   .no_use

- environment = environment || 'development'
- array = '';
- assetsImage = './images/';

9. Check next diff:
   link(rel="stylesheet" href="./css/main-global.css")
