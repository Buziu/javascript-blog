'use strict';
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href');
    console.log(articleHref);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleHref);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(titleList);
    /* remove contents of titleList */
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      /* for each article */
      const articleId = article.getAttribute('Id');
      /* get the article id */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* find the title element */
      let linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHTML);
      /* get the title from the title element create HTML of the link */
      const subject = document.querySelector('ul.titles');
      subject.insertAdjacentHTML('beforeend', linkHTML);
    }
    /* insert link into titleList */
  }

  generateTitleLinks();
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
