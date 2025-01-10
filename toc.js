// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="forward.html">Forward</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="chapter_1.html"><strong aria-hidden="true">1.</strong> Chapter 1</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="book/class_notes.html"><strong aria-hidden="true">1.1.</strong> Class Notes</a></li><li class="chapter-item expanded "><a href="book/book_notes.html"><strong aria-hidden="true">1.2.</strong> Book Notes</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="book/chapter_1/numbers.html"><strong aria-hidden="true">1.2.1.</strong> Numbers</a></li><li class="chapter-item expanded "><a href="book/chapter_1/time.html"><strong aria-hidden="true">1.2.2.</strong> Time</a></li><li class="chapter-item expanded "><a href="book/chapter_1/vocabulary.html"><strong aria-hidden="true">1.2.3.</strong> Vocabulary</a></li><li class="chapter-item expanded "><a href="book/chapter_1/accent_marks.html"><strong aria-hidden="true">1.2.4.</strong> Acccent Marks</a></li><li class="chapter-item expanded "><a href="book/chapter_1/pronouns.html"><strong aria-hidden="true">1.2.5.</strong> Pronouns</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">1.2.6.</strong> Dialogues</div></li><li class="chapter-item expanded "><a href="book/book_homework/chapter1.html"><strong aria-hidden="true">1.2.7.</strong> Homework</a></li></ol></li><li class="chapter-item expanded "><a href="book/chapter_1/take_home_homework.html"><strong aria-hidden="true">1.3.</strong> Take Home Homework</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">2.</strong> Chapter 2</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">2.1.</strong> Book Notes</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="book/chapter_2/present_tense.html"><strong aria-hidden="true">2.1.1.</strong> Present Tense</a></li><li class="chapter-item expanded "><a href="book/chapter_2/nouns_and_articles.html"><strong aria-hidden="true">2.1.2.</strong> Nouns and Articles</a></li><li class="chapter-item expanded "><a href="book/chapter_2/decriptive_adjectives_and_adjectives_of_nationality.html"><strong aria-hidden="true">2.1.3.</strong> Descriptive Adjectives and Adjectives of Nationality</a></li><li class="chapter-item expanded "><a href="book/chapter_2/the_verb_gustar_and_encantar.html"><strong aria-hidden="true">2.1.4.</strong> The Verb Gustar and Encantar</a></li><li class="chapter-item expanded "><a href="book/chapter_2/the_days_of_the_week.html"><strong aria-hidden="true">2.1.5.</strong> The Days of the Week</a></li><li class="chapter-item expanded "><a href="book/chapter_2/the_months_of_the_year.html"><strong aria-hidden="true">2.1.6.</strong> The Months of the Year</a></li></ol></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> Chapter 3</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> Book Notes</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="book/chapter_3/demonstrative_adjectives.html"><strong aria-hidden="true">3.1.1.</strong> Demonstrative Adjectives</a></li><li class="chapter-item expanded "><a href="book/chapter_3/demonstrative_pronouns.html"><strong aria-hidden="true">3.1.2.</strong> Demonstative Pronouns</a></li></ol></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> Mango Languages</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> Chapter 2</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="mango_languages/chapter_2/places_and_directions.html"><strong aria-hidden="true">4.1.1.</strong> Places and Directions</a></li><li class="chapter-item expanded "><a href="mango_languages/chapter_2/currency_and_counting.html"><strong aria-hidden="true">4.1.2.</strong> Currency and Counting</a></li><li class="chapter-item expanded "><a href="mango_languages/chapter_2/food_and_drink_culture.html"><strong aria-hidden="true">4.1.3.</strong> Food and Drink Culture</a></li><li class="chapter-item expanded "><a href="mango_languages/chapter_2/transportation_and_payment.html"><strong aria-hidden="true">4.1.4.</strong> Transportation and Payment</a></li></ol></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
