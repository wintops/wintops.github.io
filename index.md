
## LLCL for Pas2JS
Delphi/FPC LLCL into Pas2JS Web/HTML

use LLCL/VCL/FMX Forms in JS/Web/Mobile and Windows/Mac/Linux/Android/iOS!


no install extra web controls!

### Demo
  see https://wintops.github.io/llcljs/llcljs.html

![image](https:///wintops.github.io/llcljs/image_llcl.png)

![image](https:///wintops.github.io/llcljs/image_web.png)


### Code

```pascal
uses  SysUtils, Classes, Dialogs, Controls, StdCtrls, Forms,
 {$IFDEF PASJS}
   WebCtrls
 {$ELSE}

  {$IFDEF FPC}LazUTF8, LCLType,{$ELSE} Variants, XPMan,{$ENDIF}
  Graphics,    ExtCtrls,
  ComCtrls, Menus
{$ENDIF}
  ;
```




## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/wintops/wintops.github.io/edit/master/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/wintops/wintops.github.io/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
