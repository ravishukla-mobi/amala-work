/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

function updateFBTPrice() {
  var totalPrice = 0;
  if (
    $(".frequently-product_detail-row.fbt-main input.fbt_check:checked")
      .length > 0
  ) {
    totalPrice += parseFloat(
      $(".frequently-product_detail-row.fbt-main input.fbt_check").data("price")
    );
  }

  $(".frequently-product-row .frequently-product_detail-row").each(function (
    key,
    value
  ) {
    if ($(value).find("input.fbt_check:checked").length > 0) {
      totalPrice += parseFloat($(value).find("input.fbt_check").data("price"));
    }
  });

  $(".frequently-right .fbt_right .fbt-price-col strong").html(
    '<span class="rupee-symbol">₹</span>' +
      Math.round((totalPrice / 100).toFixed(2))
  );
}

function updateFBTcurrentVariant(this2, target) {
  if (!this2.currentVariant.available) {
    $("#fbt_form :input").prop("disabled", true);
    $("#fbt_form .frequently-product-list").addClass("disabled");
    $("#fbt_form :button").prop("disabled", true);
  } else {
    $("#fbt_form :input").prop("disabled", false);
    $("#fbt_form .frequently-product-list").removeClass("disabled");
    $("#fbt_form :button").prop("disabled", false);
  }

  $(target)
    .parents(".fbt_variants")
    .find('.no-js.product-form__option select[name="id"]')
    .val(this2.currentVariant.id);
  updateFBTPrice();
}

$(document).ready(function () {
  document.addEventListener("variant:changed", function (e) {
    var currentvariant = e.detail.variant;
    if (currentvariant && currentvariant.available) {
      $("#BIS_trigger").hide(); // hide notify me button
      $('.mobile-sticky-payment-btn-wrap').removeClass('hide');
      $('.mobile_sticky_notify_soldout_wrap').addClass('hide');
    } else {
      $("#BIS_trigger").show().attr("data-variant-id", currentvariant.id);
      $('.mobile-sticky-payment-btn-wrap').addClass('hide');
      $('.mobile_sticky_notify_soldout_wrap').removeClass('hide');
      $('.mobile_sticky_notify_soldout_wrap .product-form__add-button:not(#BIS_trigger)').addClass('button--disabled');
    }
  });
});

// Cart Drawer Recently Viewed Section

function loadMiniCartRecentlyViewed() {
  var items = JSON.parse(
    localStorage.getItem("recentlyViewedProducts") || "[]"
  ); // If we are on a product template, we make sure to remove the main product from the related product
  //console.log(items);
  var queryString = items
    .map(function (item) {
      return "id:" + item;
    })
    .join(" OR ");

  fetch(
    ""
      .concat(window.routes.searchUrl, "?view=")
      .concat("mini-cart-recently-viewed-products", "&type=product&q=")
      .concat(queryString),
    {
      credentials: "same-origin",
      method: "GET",
    }
  ).then(function (response) {
    response.text().then(function (content) {
      setTimeout(function () {
        $("#mini-cart__recently-viewed").html(
          content.replace(/(^[ \t]*\n)/gm, "")
        );
        $(".rectview-tab").addClass("exp");
      }, 2000); // By default the section hide the products, so we force the section to be visible
    });
  });
}

document.addEventListener("product:added", function (e) {
  loadMiniCartRecentlyViewed();
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    loadMiniCartRecentlyViewed();
  }, 2000);
});

document.addEventListener("theme:loading:start", function (e) {
  //console.log('theme:loading:start');
  loadMiniCartRecentlyViewed();
});
$(document).ready(function () {
  //loadMiniCartRecentlyViewed();

  $("#mini-cart").on("click", "ul.tabs li", function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 40) {
    $("body").addClass("search-sticky");
  } else {
    $("body").removeClass("search-sticky");
  }
});

/*document.addEventListener("cart:rerendered", function(e) {
    console.log('cart:rerendered');
  });
document.addEventListener("product:added", function(e) {
    console.log('product:added');
  });*/

/* Start PDP dynamic update the price when quantity is changed */

// $(document).ready(function(){
//   $('.quantity-selector__value').change(function(){
//     setTimeout(function(){
//       //quantity
//       var updated_q_value = $('.quantity-selector__value').val();

//       //update price
//       var new_value = ((($('.dynamic_quantity_actual_price').data('value')) * updated_q_value)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
//       $('.dynamic_quantity_actual_price').html('<span class="rupee-symbol">₹</span> '+new_value);

//       // update compare price
//       var new_comp_price = ((($('.dynamic_quantity_comp_price').data('value')) * updated_q_value)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
//       $('.dynamic_quantity_comp_price').html('<span class="rupee-symbol">₹</span> '+new_comp_price);

//     }, 600);
//   });
//   $('.quantity-selector__button').click(function(){
//     setTimeout(function(){
//       //quantity
//       var updated_q_value = $('.quantity-selector__button').siblings('.quantity-selector__value').val();

//       //update price
//       var new_value = ((($('.dynamic_quantity_actual_price').data('value')) * updated_q_value)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
//       $('.dynamic_quantity_actual_price').html('<span class="rupee-symbol">₹</span> '+new_value);

//       // update compare price
//       var new_comp_price = ((($('.dynamic_quantity_comp_price').data('value')) * updated_q_value)/100).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
//       $('.dynamic_quantity_comp_price').html('<span class="rupee-symbol">₹</span> '+new_comp_price);
//     }, 600);
//   });

// });
/* End PDP dynamic update the price when quantity is changed */

/* Start PDP dynamic product info tabs */
$(document).ready(function () {
  RESPONSIVEUI.responsiveTabs();
  if (window.matchMedia('(max-width: 767px)').matches) {
    $('.product-tabs__row .product-info__tabs h2.tab-heading')[0].click();
  }
});
var RESPONSIVEUI = {};
RESPONSIVEUI.responsiveTabs = function () {
  if (!$(".product-info__tabs").hasClass("enabled")) {
    // if we haven't already enabled tabs
    $(".product-info__tabs").addClass("enabled"); // used to style tabs if JS is present
    //loop through all sets of tabs on the page
    var tablistcount = 1;
    $(".product-info__tabs").each(function () {
      var $tabs = $(this);
      // add tab heading and tab panel classes
      $tabs.children("h1,h2,h3,h4,h5,h6").addClass("tab-heading");
      $tabs.children(".product-info__block").addClass("tab-panel");

      // determine if markup already identifies the active tab panel for this set of tabs
      // if not then set first heading and tab to be the active one
      var $activePanel = $tabs.find(".active-panel");
      if (!$activePanel.length) {
        //	var $activePanel = $tabs.find('.tab-panel').first().addClass('active-panel');
      }

      $tabs
        .find(".tab-panel")
        .not(".active-panel")
        .hide()
        .attr("aria-hidden", "true"); //hide all except active panel
      $activePanel.attr("aria-hidden", "false");
      /* make active tab panel hidden for mobile */
      $activePanel.addClass("hidden-mobile");

      // wrap tabs in container - to be dynamically resized to help prevent page jump
      var $tabsWrapper = $("<div/>", { class: "tabs-wrapper" });
      $tabs.wrap($tabsWrapper);

      var highestHeight = 0;

      // determine height of tallest tab panel. Used later to prevent page jump when tabs are clicked
      $tabs.find(".tab-panel").each(function () {
        var tabHeight = $(this).height();
        if (tabHeight > highestHeight) {
          highestHeight = tabHeight;
        }
      });

      //create the tab list
      var $tabList = $("<ul/>", { class: "tab-list", role: "tablist" });

      //loop through each heading in set
      var tabcount = 1;
      $tabs.find(".tab-heading").each(function (index, item) {
        var $tabHeading = $(this);
        var $tabPanel = $(this).next();

        $tabHeading.attr("tabindex", index);

        // CREATE TAB ITEMS (VISIBLE ON DESKTOP)
        //create tab list item from heading
        //associate tab list item with tab panel
        var $tabListItem = $("<li/>", {
          class: "product-info__tabs",
          id: "tablist" + tablistcount + "-tab" + tabcount,
          "aria-controls": "tablist" + tablistcount + "-panel" + tabcount,
          "tab-name": $tabHeading.text().toLowerCase(),
          role: "tab",
          tabindex: index,
          text: $tabHeading.text(),
          keydown: function (objEvent) {
            if (objEvent.keyCode == 13) {
              // if user presses 'enter'
              $tabListItem.click();
            }
          },
          click: function () {
            //Show associated panel

            //set height of tab container to highest panel height to avoid page jump
            $tabsWrapper.css("height", highestHeight);

            // remove hidden mobile class from any other panel as we'll want that panel to be open at mobile size
            $tabs.find(".hidden-mobile").removeClass("hidden-mobile");

            // close current panel and remove active state from its (hidden on desktop) heading
            $tabs
              .find(".active-panel")
              .toggle()
              .removeClass("active-panel")
              .attr("aria-hidden", "true")
              .prev()
              .removeClass("active-tab-heading");

            //make this tab panel active
            $tabPanel
              .toggle()
              .addClass("active-panel")
              .attr("aria-hidden", "false");

            //make the hidden heading active
            $tabHeading.addClass("active-tab-heading");

            //remove active state from currently active tab list item
            $tabList.find(".active-tab").removeClass("active-tab");

            //make this tab active
            $tabListItem.addClass("active-tab");

            //reset height of tab panels to auto
            $tabsWrapper.css("height", "auto");
          },
        });

        //associate tab panel with tab list item
        $tabPanel.attr({
          role: "tabpanel",
          "aria-labelledby": $tabListItem.attr("id"),
          id: "tablist" + tablistcount + "-panel" + tabcount,
        });

        // if this is the active panel then make it the active tab item
        if ($tabPanel.hasClass("active-panel")) {
          $tabListItem.addClass("active-tab");
        }
        // add tab item
        $tabList.append($tabListItem);
        // TAB HEADINGS (VISIBLE ON MOBILE)
        // if user presses 'enter' on tab heading trigger the click event
        $tabHeading.keydown(function (objEvent) {
          if (objEvent.keyCode == 13) {
            $tabHeading.click();
          }
        });

        //toggle tab panel if click heading (on mobile)
        $tabHeading.click(function () {
          // remove any hidden mobile class
          $tabs.find(".hidden-mobile").removeClass("hidden-mobile");

          // if this isn't currently active
          if (!$tabHeading.hasClass("active-tab-heading")) {
            //get position of active heading
            if ($(".active-tab-heading").length) {
              var oldActivePos = $(".active-tab-heading").offset().top;
            }

            // close currently active panel and remove active state from any hidden heading
            $tabs
              .find(".active-panel")
              .slideToggle()
              .removeClass("active-panel")
              .prev()
              .removeClass("active-tab-heading");

            //close all tabs
            $tabs.find(".tab-panel").hide().attr("aria-hidden", "true");

            //open this panel
            $tabPanel
              .slideToggle()
              .addClass("active-panel")
              .attr("aria-hidden", "false");

            // make this heading active
            $tabHeading.addClass("active-tab-heading");

            var $currentActive = $tabs.find(".active-tab");

            //set the active tab list item (for desktop)
            $currentActive.removeClass("active-tab");
            var panelId = $tabPanel.attr("id");
            var tabId = panelId.replace("panel", "product-info__tabs");
            $("#" + tabId).addClass("active-tab");

            //scroll to active heading only if it is below previous one
            // 						var tabsPos = $('.product-info__tabs').offset().top;
            // 						var newActivePos = $('.active-tab-heading').offset().top;
            // 						if(oldActivePos < newActivePos) {
            // 							$('html, body').animate({ scrollTop: tabsPos }, 0).animate({ scrollTop: newActivePos }, 400);
            // 						}
          }

          // if this tab panel is already active
          else {
            // hide panel but give it special hidden-mobile class so that it can be visible at desktop size
            $tabPanel.removeClass("active-panel").slideToggle(function () {
              $(this).addClass("hidden-mobile");
            });

            //remove active heading class
            $tabHeading.removeClass("active-tab-heading");

            //don't alter classes on tabs as we want it active if put back to desktop size
          }
        });

        tabcount++;
      });

      // add finished tab list to its container
      $tabs.prepend($tabList);

      // next set of tabs on page
      tablistcount++;
    });
  }
};

/* Start My Account Navigation code for Mobiles */
$(document).ready(function () {
  var isMobile = navigator.userAgent.match(
    /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
  );

  if (!isMobile) {
    if ($("#tablist1-tab1")) {
      $("#tablist1-tab1").addClass("active-tab");
      $("#tablist1-panel1").show();
      $("#tablist1-panel1").addClass("active-panel");
    }
  }

  $(".value-picker-button.value-picker-button--pill").on("click", function () {
    document
      .getElementById("account-selector")
      .setAttribute("aria-hidden", "false");
  });
  $(".value-picker__close").on("click", function () {
    document
      .getElementById("account-selector")
      .setAttribute("aria-hidden", "true");
  });
});

/* EOF My Account Navigation code for Mobiles */

$(document).ready(function () {
  // FBT on change variants

  jQuery(".product-form__single-selector").change(function (e) {
    var currentVariant = [];
    if ($(this).val() != "NA") {
      $(".product-form__add-button").removeClass("button--disabled");
      $(".product-form__add-button").removeAttr("disabled", true);
      $(".amala-tooltip").addClass("d-none");
    } else {
      $(".product-form__add-button").addClass("button--disabled");
      $(".product-form__add-button").attr("disabled", true);
      $(".amala-tooltip").removeClass("d-none");
    }

    if ($(this).val() != "NA") {
      var optionss = jQuery(e.target)
        .parents(".fbt_variants")
        .find(".product-form__single-selector");
      optionss.each(function (key, item) {
        currentVariant["option" + jQuery(item).attr("data-option-position")] =
          $(item).val();
      });
      var selectors = jQuery(e.target)
        .parents(".fbt_variants")
        .find(".single-option-selector option");
      var found_variant = "";
      selectors.each(function (key, variantt) {
        if ($(variantt).data("option1") == currentVariant["option1"]) {
          if ($(variantt).data("option2")) {
            if ($(variantt).data("option2") == currentVariant["option2"]) {
              if ($(variantt).data("option3")) {
                if ($(variantt).data("option3") == currentVariant["option3"]) {
                  found_variant = variantt;
                  return false;
                }
              } else {
                found_variant = variantt;
                return false;
              }
            }
          } else {
            found_variant = variantt;
            return false;
          }
        }
      });

      if (found_variant != "") {
        var found = $(found_variant).val();
        var found_price = $(found_variant).data("price");
        jQuery(e.target)
          .parents(".fbt_variants")
          .find(".single-option-selector")
          .val(found);
        jQuery(e.target)
          .parents(".frequently-product_detail-row")
          .find(".fbt_price")
          .html(found_price);

        if (
          found_price.trim() == "sold out" &&
          jQuery(e.target)
            .parents(".frequently-product_detail-row")
            .find(".fbt_title input.fbt_check")
            .prop("checked")
        ) {
          jQuery(e.target)
            .parents(".frequently-product_detail-row")
            .find(".fbt_title input.fbt_check")
            .prop("checked", false);
          jQuery(e.target)
            .parents(".frequently-product_detail-row")
            .find(".fbt_title input.fbt_check")
            .data("price", "");
        } else {
          jQuery(e.target)
            .parents(".frequently-product_detail-row")
            .find(".fbt_title input.fbt_check")
            .data("price", $(found_variant).data("actual-price"));
        }
      }

      updateFBTPrice();
    }
  });

  $(
    ".frequently-product-row input.fbt_check, .frequently-product_detail-row.fbt-main input.fbt_check"
  ).change(function () {
    updateFBTPrice();
  });

  // FBT form submit functionality implementation
  $("#fbt_form .cutom-button").click(function (event) {
    event.preventDefault();

    var mainProductId = $(
      '.frequently-product_detail-row.fbt-main .fbt_variants input[name="id"]'
    ).data("product-id");

    var variantid = [];
    var count = 0;
    $(".frequently-product-row .frequently-product_detail-row").each(function (
      key,
      value
    ) {
      if ($(value).find("input.fbt_check:checked").length > 0) {
        variantid[count++] = $(value)
          .find(".no-js.product-form__option select.single-option-selector")
          .val();
      }
    });

    if (
      $(".frequently-product_detail-row.fbt-main input.fbt_check:checked")
        .length > 0
    ) {
      var add_main_product = true;
    } else {
      var add_main_product = false;
    }

    console.log(variantid);
    console.log(add_main_product);

    if (variantid["0"] && variantid["1"] && variantid["2"]) {
      var itemss = {
        items: [
          {
            quantity: 1,
            id: variantid["0"],
          },
          {
            quantity: 1,
            id: variantid["1"],
          },
          {
            quantity: 1,
            id: variantid["2"],
          },
        ],
      };
    } else if (variantid["0"] && variantid["1"]) {
      var itemss = {
        items: [
          {
            quantity: 1,
            id: variantid["0"],
          },
          {
            quantity: 1,
            id: variantid["1"],
          },
        ],
      };
    } else if (variantid["0"]) {
      var itemss = {
        items: [
          {
            quantity: 1,
            id: variantid["0"],
          },
        ],
      };
    } else {
      var itemss = "";
    }

    if (itemss && itemss != "") {
      $.ajax({
        type: "POST",
        url: "/cart/add",
        data: itemss,
        dataType: "json",
        success: function (data) {
          // updating the items count in cart
          if (variantid.length > 0) {
            document.documentElement.dispatchEvent(
              new CustomEvent("product:added", {
                bubbles: true,
                detail: {
                  quantity: variantid.length,
                },
              })
            );
          }
        },
        error: function (err) {
          console.log(err);
        },
        complete: function (response) {},
      });
    }

    setTimeout(function () {
      if (add_main_product) {
        // adding the main product
        $("body")
          .find("form#product_form_" + mainProductId + ' button[type="submit"]')
          .trigger("click");
      } else {
        var cart_icon = $(
          '.header__action-item-link.header__cart-toggle[data-action="toggle-mini-cart"]'
        );
        $(cart_icon)[0].click();
      }
    }, 500);

    return false;
  });
});

/*   SOF PDP Whatsapp Share code */
$(document).ready(function () {
  $(".whatsapp-share-main").click(function (event) {
    var url = $(this).attr("data-msg");
    event.preventDefault();
    if (
      /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      window.open("whatsapp://send?text=" + url);
    } else {
      window.open("https://web.whatsapp.com:/send?text=" + url);
    }
  });
});
/*   EOF PDP Whatsapp Share code */

/* product tags */
$(document).ready(function () {
  $(".product-tags .tag_list_hidden").hide();

  $(".product-tags .tag_show_more").click(function () {
    $(this).parents(".product-tags").find(".tag_list_hidden").toggle();
    if ($(this).html().trim() == "Show More") {
      $(this).html("Show Less");
    } else {
      $(this).html("Show More");
    }
    //$(this).hide();
  });
});

// PDP seller section

$(document).ready(function () {
  $("#seller_with_products").hide();
  function seller_section(vendor_name, main_id) {
    var vendor_names = vendor_name.trim();

    const queryObject = {
      query:
        '{products(first:20, query:"vendor:' +
        vendor_names +
        '") {edges {node {id title handle images(first:1) {edges {node {originalSrc}}}variants(first:1){edges{node{ price  compareAtPrice}}}}}}}',
    };
    $.ajax({
      type: "POST",
      url: "https://amala-earth.myshopify.com/api/2021-01/graphql.json",
      dataType: "json",
      headers: {
        "X-Shopify-Storefront-Access-Token": "b0806f766a129cd1b49803190ab90306",
      },
      data: JSON.stringify(queryObject),
      contentType: "application/json",
      success: function (data) {
        //console.log("successful post");
        var products = data["data"]["products"]["edges"];
        var count = 0;
        $(products).each(function (index) {
          //console.log(atob(products[index]['node']['id']).split('Product/')[1]);
          if (
            atob(products[index]["node"]["id"]).split("Product/")[1] == main_id
          ) {
            //console.log(atob(products[index]['node']['id']).split('Product/')[1]);
          } else {
            if (
              products[index]["node"]["images"]["edges"][0]["node"][
                "originalSrc"
              ]
            ) {
              count++;
              var div_product = $("#seller_with_products").find(
                ".product-" + count
              );
              if (products[index]["node"]["title"].length > 47) {
                $(div_product)
                  .find("p.title")
                  .html(
                    products[index]["node"]["title"].substring(0, 47) + "..."
                  );
              } else {
                $(div_product)
                  .find("p.title")
                  .html(products[index]["node"]["title"]);
              }
              $(div_product)
                .find("img")
                .attr(
                  "src",
                  products[index]["node"]["images"]["edges"][0]["node"][
                    "originalSrc"
                  ]
                );
              $(div_product)
                .find("p.price")
                .html(
                  "₹" +
                    Math.ceil(
                      products[index]["node"]["variants"]["edges"][0]["node"][
                        "price"
                      ]
                    )
                );
              if (
                products[index]["node"]["variants"]["edges"][0]["node"][
                  "compareAtPrice"
                ]
              ) {
                $(div_product)
                  .find("p.comp_price")
                  .html(
                    "₹" +
                      Math.ceil(
                        products[index]["node"]["variants"]["edges"][0]["node"][
                          "compareAtPrice"
                        ]
                      )
                  );
              } else {
                $(div_product).find("p.comp_price").html("");
              }
              $(div_product)
                .find("a.product-link")
                .attr("href", "/products/" + products[index]["node"]["handle"]);
              $(div_product).removeClass("seller-item-hide");

              if (count == 3) {
                return false;
              }
            }
          }
        });

        if (count > 0) {
          $("#seller_with_products").show();
        }
      },
      error: function (data) {
        console.log(data); //atob(product_id);
        console.log("errors");
      },
    });
  }
  //   	seller_section(vendor_name,main_product);
});

// Estimate delivery
$(document).ready(function () {
  //   setTimeout(function(){
  //     $('#estimate_delivery button').removeAttr("disabled");
  //   },2000);
  var AED_loader = $("div#estimate_delivery .loader_span");
  var AED_error = $("div#estimated_delivery .error_msg");
  var AED_input = $("div#estimate_delivery input#pin_code_to");
  var AED_button = $("div#estimate_delivery button");
  var AED_button_close = $("div#estimate_delivery .cross-submit");
  var AED_delivery_msg = $("#estimated_delivery .delivery_msg");
  var interval = null;

  window.theme = window.theme || [];

  (function ($) {
    // Restricts input for the set of matched elements to the given inputFilter function.
      $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          } else {
            this.value = this.value.replace(/ /g,'');
          }
        });
      };
    })(jQuery);

  theme.getPincodeDeliveryData = function() {
    var length, pinCodeFieldVal = AED_input.val(),
        formattedpincodeValue = pinCodeFieldVal.replace(/[^0-9]/g, '');
    AED_input.val(formattedpincodeValue);
    length = AED_input.val().length;

    let addPackagePrepDays = function(apiDate, packagePrepDays){
      let estimated_delivery_date = new Date(apiDate);
      estimated_delivery_date = new Date(estimated_delivery_date.setDate(estimated_delivery_date.getDate() + packagePrepDays));
      let parts = estimated_delivery_date.toString().substring(4, 15).split(" ");
      return parts[0]+" "+parts[1]+", "+parts[2];
            
    };

    var pincode_input = $("div#estimate_delivery input#pin_code_to"),
        pickup_postcode = $("div#seller_additional_info .wk_seller_custom_detail").html().trim(),
        delivery_postcode = pincode_input.val(),
        sku_code = $('#estimate_delivery').attr('data-variant-id'),
        weight = $('#estimate_delivery').attr('data-product-weight'),
        packaging_days = document.getElementById("packing_time").getAttribute("data-packing-time");;
    if (pincode_input.val() == "") {
      AED_error.html("Please enter your pincode.");
    } else {
      if(length != 6) {
        AED_error.html("Please enter a valid pincode.");
        return false;
      }

      AED_button.hide();
      AED_loader.show();
      AED_error.html("");
      setCookie("lastUserPinCode", pincode_input.val());

      var form = new FormData();
      form.append("pick_up_code", pickup_postcode);
      form.append("drop_code", delivery_postcode);
      form.append("cod", "0");
      form.append("weight", parseInt(weight)/1000);
      form.append("sku", sku_code);
      form.append("packaging_days", packaging_days);
      
      $.ajax({
        type: "POST",
        url: `${theme.apiUrl}/shipRocketCourierServiceability.php`,
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form,
        dataType: "json",
        success: function (response) {
          if(response.status == true){
            let package_prep_days = 0;
            let estimated_delivery_date = addPackagePrepDays(response.estimated_delivery_date, package_prep_days);
            $("#estimated_delivery .delivery_msg tr.prepaid td.estimate_date").html(estimated_delivery_date);
            if($('#estimate_delivery').attr('data-vendor-ncod') == 'false'){
              form.set('cod', '1');
              $.ajax({
                type: "POST",
                url: `${theme.apiUrl}/shipRocketCourierServiceability.php`,
                timeout: 0,
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                data: form,
                dataType: "json",
                success: function (response) {
                  if(response.status == true){
                    AED_loader.hide();
                    AED_button_close.removeClass("hide_cross");
                    AED_delivery_msg.removeClass("hide_delivery");
                    let estimated_delivery_date = addPackagePrepDays(response.estimated_delivery_date, package_prep_days);
                      
                    $("#estimated_delivery .delivery_msg tr.cod td.estimate_date").html(estimated_delivery_date);
                  }else{
                    AED_loader.hide();
                    AED_button.show();
                    AED_delivery_msg.addClass("hide_delivery");
                    AED_error.html(response.message);
                  }
                },
                error: function (error) {
                  console.log("error", error);
                },
              });
            }else{
              AED_loader.hide();
              AED_button_close.removeClass("hide_cross");
              AED_delivery_msg.removeClass("hide_delivery");
              $("#estimated_delivery .delivery_msg tr.cod td.estimate_date").html('Not Available');
            }
          }else{
            AED_loader.hide();
            AED_button.show();
            AED_delivery_msg.addClass("hide_delivery");
            AED_error.html(response.message);
          }
        },
        error: function (error) {
          console.log("error", error);
        },
      });
    }
  }

  $('#pin_code_to').inputFilter(function(value) {
    return /^\d*$/.test(value);    // Allow digits only, using a RegExp
  });

  if (getCookie("lastUserPinCode") != "" && getCookie("lastUserPinCode") != "undefined") {
    AED_input.val(getCookie("lastUserPinCode"));
    AED_button.hide();
    AED_loader.show();
    AED_error.html("");
    // GetDeliveryData();
    theme.getPincodeDeliveryData();
    $('#estimate_delivery .form__input-wrapper .form__field').addClass('is-filled');
  } else {
    AED_button.show();
    AED_loader.hide();
    AED_error.html("");
  }
  AED_input.on("keypress keyup", function () {
    if (AED_input.val() != "") {
      AED_delivery_msg.addClass("hide_delivery");
      AED_loader.hide();
      AED_button.show();
      AED_button_close.addClass("hide_cross");
    }
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function formatDate(date) {
    var str = date.replaceAll("-", " ").toString();
    var d = new Date(str),
      month = monthNames[d.getMonth()],
      day = "" + d.getDate(),
      dayname = days[d.getDay()],
      year = d.getFullYear();
    console.log(d.getMonth());
    console.log(date);
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return dayname + ", " + day + " " + month;
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  $("body").on("click", ".atc-similar", function (e) {
    e.preventDefault();
    variant_id = $(this).attr("data-variant-id");
    properties = {};

    data = {
      id: variant_id,
      quantity: 1,
      properties: properties,
    };
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: data,
      dataType: "json",
      success: function () {
        ga("send", "event", "ecommerce", "add-to-cart");
        event = new CustomEvent("product:added", {
          bubbles: true,
          detail: {
            button: e,
            variant: null,
            quantity: 1,
          },
        });
        $("html")[0].dispatchEvent(event);
      },
    });
  });

  function setCookie(cname, cvalue) {
    const d = new Date();
    //d.setTime(d.getTime() + (exdays*24*60*60*1000));
    //let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";path=/;";
  }

  // AE-Feb-025 Showing date of delivery

  AED_button_close.click(function () {
    AED_loader.hide();
    AED_delivery_msg.addClass("hide_delivery");
    AED_button.show();
    AED_button_close.addClass("hide_cross");
  });

  function GetDeliveryData() {
    clearInterval(interval);
    if (AED_input.val() == "") {
      AED_error.html("Please enter your pincode.");
    } else {
      AED_button.hide();
      AED_loader.show();
      AED_error.html("");
      setTimeout(function () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        var n = today.getHours();

        if (n > 14) {
          dd = String(today.getDate() + 1).padStart(2, "0");
        }

        today = dd + "-" + mm + "-" + yyyy;

        var msg = "";
        setCookie("lastUserPinCode", AED_input.val());

        var pin_code_to = AED_input.val();

        var value = $(
          "div#seller_additional_info .wk_seller_custom_detail"
        ).html();
        var form = new FormData();

        form.append("pinCodeFrom", value);
        form.append("pinCodeTo", pin_code_to);
        form.append("pickupDate", today);
        form.append("pickupTime", "15:00");
        form.append("subProductCode", "P");

        var settings = {
          url:
            "https://api.amalaearth.com/api.php?pinCodeFrom=" +
            value +
            "&pinCodeTo=" +
            pin_code_to +
            "&pickupDate=28-06-2021&pickupTime=17:00&subProductCode=" +
            "P",
          method: "POST",
          async: false,
          timeout: 0,
          processData: false,
          mimeType: "multipart/form-data",
          contentType: false,
          data: form,
        };

        //                 $.ajax(settings).done(function (response) {
        //                   var response_data_1 = JSON.parse(response);
        //                   //console.log(response_data['status']);
        //                   if((response_data_1['status'] == 200) && (response_data_1['data']['GetDomesticTransitTimeForPinCodeandProductResult']['ErrorMessage'] == 'Valid') ){
        //                     var delivery_date = response_data_1['data']['GetDomesticTransitTimeForPinCodeandProductResult']['ExpectedDateDelivery'];
        //                     console.log(response_data_1['data']);
        //                     document.cookie = 'estimate_delivery_'+value+'p='+delivery_date;
        //                     $('#estimated_delivery .delivery_msg tr.prepaid td.estimate_date').html(formatDate(delivery_date));
        //                   }else{ console.log('aaaaaaa');
        //                     $('#estimated_delivery .error_msg').html('Invalid Pincode');
        //                     return false;
        //                   }
        //                 });
        Date.prototype.addDays = function (days) {
          this.setDate(this.getDate() + parseInt(days));
          return this;
        };
        el_days =
          parseInt(
            document
              .getElementById("packing_time")
              .getAttribute("data-packing-time")
          ) + 10;
        var date = new Date();
        var currentDate = new Date();
        currentDate.addDays(el_days);
        delivery_date = currentDate
          .toJSON()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/");
        $("#estimated_delivery .delivery_msg tr.prepaid td.estimate_date").html(
          delivery_date
        );
        if (
          $("#estimated_delivery .delivery_msg tbody .cod").hasClass(
            "no-display"
          )
        ) {
          $("#estimated_delivery .delivery_msg tr.cod td.estimate_date").html(
            "Not Available"
          );
        } else {
          var form = new FormData();
          form.append("pinCodeFrom", value);
          form.append("pinCodeTo", pin_code_to);
          form.append("pickupDate", today);
          form.append("pickupTime", "15:00");
          form.append("subProductCode", "C");

          var settings = {
            url:
              "https://api.amalaearth.com/api.php?pinCodeFrom=" +
              value +
              "&pinCodeTo=" +
              pin_code_to +
              "&pickupDate=28-06-2021&pickupTime=17:00&subProductCode=" +
              "C",
            method: "POST",
            async: false,
            timeout: 0,
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
          };

          //                   $.ajax(settings).done(function (response) {
          //                     var response_data2 = JSON.parse(response);
          //                     if(response_data2['status'] == 200){
          //                       var delivery_date = response_data2['data']['GetDomesticTransitTimeForPinCodeandProductResult']['ExpectedDateDelivery'];

          //                       document.cookie = 'estimate_delivery_'+value+'_c='+delivery_date;
          //                       $('#estimated_delivery .delivery_msg tr.cod td.estimate_date').html(formatDate(delivery_date));
          //                     }
          //                   });
          Date.prototype.addDays = function (days) {
            this.setDate(this.getDate() + parseInt(days));
            return this;
          };
          el_days =
            parseInt(
              document
                .getElementById("packing_time")
                .getAttribute("data-packing-time")
            ) + 10;
          var date = new Date();
          var currentDate = new Date();
          currentDate.addDays(el_days);
          delivery_date = currentDate
            .toJSON()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/");
          $("#estimated_delivery .delivery_msg tr.cod td.estimate_date").html(
            delivery_date
          );
        }

        if (AED_error.html() == "") {
          AED_delivery_msg.removeClass("hide_delivery");
        }

        AED_loader.hide();
        AED_button.hide("");
        AED_button_close.removeClass("hide_cross");
      }, 200);
    }
  }

  // AED_button.click(GetDeliveryData);
  AED_button.click(theme.getPincodeDeliveryData);

});
// new page template

$(document).ready(function () {
  $($($(".shopby-concerntemplate .load-more"))[0]).addClass("show-load");
  $(".shopby-concerntemplate .collection__layout-button").click(function () {
    $(".shopby-concerntemplate .collection__layout-button").removeClass(
      "is-selected"
    );
    $(this).addClass("is-selected");
    if ($(this).data("layout-mode") == "grid") {
      $(this)
        .parents(".shopby-concerntemplate")
        .find(".product-list .product-item")
        .addClass("1/3--tablet 1/--lap-and-up");
      $(this)
        .parents(".shopby-concerntemplate")
        .find(".product-list .product-item")
        .removeClass("product-item--list");
    } else {
      $(this)
        .parents(".shopby-concerntemplate")
        .find(".product-list .product-item")
        .removeClass("1/3--tablet 1/--lap-and-up");
      $(this)
        .parents(".shopby-concerntemplate")
        .find(".product-list .product-item")
        .addClass("product-item--list");
    }
  });

  $(".shopby-concerntemplate .load-more").click(function () {
    $(this).removeClass("show-load");
    $(this).removeClass("no-display");
    var all_elements = $(this).siblings(".hide-product-item");
    $($($(this).siblings(".load-more.no-display"))[0]).addClass("show-load");
    $(all_elements).each(function (i) {
      if (i < 16) {
        $(all_elements[i]).removeClass("hide-product-item");
      }
    });
  });

  $(document).on('click','.product_info_price_review_badge-right .brand_score_img', function(e){
    $('html, body').animate({
        scrollTop: $("#shopify-section-recommend-section-pdp").offset().top - 150
    }, 1500);
  });
});

$(window).on("load", function () {
  setTimeout(function () {
    $("#estimate_delivery button").removeAttr("disabled");
  }, 1000);
});

window.addEventListener("popstate", function (event) {
  newStatePopup.pop();
  window.history.replaceState("new-popup-state", null, location.href);

  // check if navigation menu opened
  if ($(".header__mobile-nav-toggle").attr("aria-expanded") == "true") {
    $(".mobile-menu").attr("aria-hidden", "true");
    $(".mobile-menu").css("max-height", "");
    $(".header__mobile-nav-toggle").attr("aria-expanded", "false");

    document.body.classList.remove("no-mobile-scroll");
  }

  // check if mini cart opened
  if (
    $(".header__action-item-link.header__cart-toggle").attr("aria-expanded") ==
    "true"
  ) {
    $(".mini-cart").attr("aria-hidden", "true");
    $(".mini-cart").css("max-height", "");
    $(".header__action-item-link .header__cart-icon").attr(
      "aria-expanded",
      "false"
    );
    $(".header__action-item-link.header__cart-toggle").attr(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("no-mobile-scroll");
  }

  // check if login box opened
  if ($(".header__action-item-link").attr("aria-expanded") == "true") {
    $("#account-popover").attr("aria-hidden", "true");
    $("#account-popover").css("height", "");
    $(".header__action-item-link.header__account-icon").attr(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("no-mobile-scroll");
  }

  // check if gallery popup opened
  if ($(".product-gallery--with-thumbnails").find("div.pswp--open")) {
    $(".product-gallery--with-thumbnails")
      .find("div.pswp--open")
      .attr("aria-hidden", "true")
      .removeClass("pswp--open");
  }

  // check if search box opened
  if ($("#st-trending-search").is(":visible")) {
    $(".search-bar__input").blur();
    $("#st-trending-search").hide();
  }

  // check if view similar box opened
  if ($("#view-similar-product-wrapper").hasClass("show")) {
    $(".vs-overlay").removeClass("show");
    $("body").removeClass("overflow-hidden");
    $("#view-similar-product-wrapper").removeClass("show");
  }

    // check if combo modal opened
    if($('.combo-product-modal').attr('aria-hidden') == 'false') {
        $('.combo-product-modal').attr('aria-hidden', true);
    }
});

$("body").on("click", ".Concern > .filter-head", function (e) {
  $(this).siblings(".filter-body").toggle();
  $(this).children("span.arrow").toggle();
  console.log($(this).siblings(".filter-body"));
});
$("body").on("click", ".Concern > .filter-item-head", function (e) {
  $(this).siblings(".filter-item-body").toggle();
  $(this).children("span.arrows").toggle();
  console.log($(this).children("span.arrows"));
});

if($(".collection-submenu-item.active").length > 0){
  let coll = $(".collection-submenu-item.active").data("title");
  $("." + coll).addClass("show");
  var activeFilter = $(".collection-submenu-item.active").position().left - 100;
  $(".collection-scrollabale-menu").scrollLeft(activeFilter);
}

// bundle product add to cart
$(document).on('click','.additional-product .details_btn',function(e){
  e.preventDefault();
  var $this = $(this),
  variant_id = $this.attr("data-id"),
  data = {
    id: variant_id,
    quantity: 1,
  };
  $this.addClass('btn-loader');
  $.ajax({
    type: "POST",
    url: "/cart/add.js",
    data: data,
    dataType: "json",
    success: function () {
      $('.cart-toast').addClass('show').removeClass('slide-out');
      setTimeout(function () {
        $('.cart-toast').removeClass('show').addClass('slide-out');
      }, 5000);
      $.getJSON('/cart.js',function(cart){
        $('.header__inner .header__cart-count').text(cart.item_count);
      });
      $this.removeClass('btn-loader');
    },
  });
});
$(document).on('click','.brand_list_view_all_btn',function(e){
  let sectionId = $(this).attr('data-sectionid');
  $(`#shopify-section-${sectionId} .additional_block`).each(function(){
      $(this).removeClass('hide');
  });
  $(this).hide();
});
$(document).on('click', '.faq_view_all_steps .view_all_btn', function(e){
  $(".ingredient_style_container .faq_questions_container").css("display", "block");
  $(".faq_view_all_steps .view_all_btn").css("display", "none");
  $(".faq_view_all_steps .hide_all_btn").css("display", "inline-block");
});
$(document).on('click', '.faq_view_all_steps .hide_all_btn', function(e){
  $(".ingredient_style_container .faq_questions_container:not(:first-child)").css("display", "none");
  $(".faq_view_all_steps .hide_all_btn").css("display", "none");
  $(".faq_view_all_steps .view_all_btn").css("display", "inline-block");
});
$(function(){
  if(meta.page.pageType == "product"){
    $.ajax({
    type: "GET",
    url: theme.apiUrl+"/versions/v1/web/getProductGroupings?productId="+meta.product.id,
    dataType: "json",
    success: function (response) {
      $mhtml = "";
      console.log(response.products);
      $.each(response.products, function( index, value ) {
        var exclass = "";
        if(index == 0){
          exclass = "active";
        }
          $mhtml = $mhtml + "<div class=\"card "+exclass+"\"> <div class=\"tooltip tlp"+index+" \">"+value.name+"</div> <span class=\"dot\"> <a href=\""+value.url+"\"> <img class=\"circleb\" data-src=\""+value.image+"\" src=\""+value.image+"\" alt=\""+value.name+"\"> </a> </span> </div>";
      });
      $(".pdpgrouping .slider").html($mhtml);

      $('#groupingSlider').slick({
        
        arrows: false,
        centerMode: false,
        infinite: false,
        centerPadding: '10px',
        slidesToShow: 9.5,
        slidesToScroll: 10,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: true,
              centerPadding: '10px',
              slidesToShow: 8,
              slidesToScroll: 8
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerPadding: '10px',
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      });

      
    },
  });
  }
});
var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------

Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

let rrPrice = document.querySelector(".rupee-symbol").innerText;
function optimizeCode() {
  function updatePrice(element) {
    var cusPrice = element.parentElement.nextElementSibling.dataset.customPrice;
    var customQuantity = element.value;
    var ttPrice = cusPrice * customQuantity;
    var res = rrPrice + Shopify.formatMoney(ttPrice, "{{amount}}");
    var mainRes = res.replace(/\.00/g, '');
    element.parentElement.nextElementSibling.nextElementSibling.innerText = mainRes;
  }

  document.querySelector('#plus-button').addEventListener('click', function() {
    setTimeout(() => {
      updatePrice(this.previousElementSibling);
    }, 500);
  });

  document.querySelector('.minus-button').addEventListener('click', function() {
    setTimeout(() => {
      updatePrice(this.nextElementSibling);
    }, 500);
  });
}

optimizeCode(); 
// document.querySelector('#plus-button').addEventListener('click',function(){
//   setTimeout(() => {
    
//     var cusPrice = this.parentElement.nextElementSibling.dataset.customPrice;
//     var customQuantity = this.previousElementSibling.value;
//     var ttPrice = cusPrice * customQuantity
//     var res= rrPrice +  Shopify.formatMoney(ttPrice,"{{amount}}");
//     var mainRes=res.replace(/\.00/g, '');
//     this.parentElement.nextElementSibling.nextElementSibling.innerText=  mainRes;
//   }, 500)  
// });
// document.querySelector('.minus-button').addEventListener('click',function(){
    
//   setTimeout(() => {
//     var cusPrice = this.parentElement.nextElementSibling.dataset.customPrice;
//     var customQuantity = this.nextElementSibling.value;
//     var ttPrice = cusPrice * customQuantity
//     var res= rrPrice +  Shopify.formatMoney(ttPrice,"{{amount}}");
//     var mainRes=res.replace(/\.00/g, '');
//     this.parentElement.nextElementSibling.nextElementSibling.innerText=  mainRes;

//   }, 500) 
  
  
// });
