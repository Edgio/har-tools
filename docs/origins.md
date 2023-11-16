---
title: "The Origins of HAR and How Everything Went Wrong"
description: "The story of HAR's rise, fall, and the ensuing collateral damage it has wrought."
---

# The Origins of HAR and How Everything Went Wrong

> **_The story of HAR's rise, fall, and the ensuing collateral damage it has wrought_**
>
> _How rogue browsers and an abandoned standard highlighted the hidden risks of using the platform._

![cover image](./images/cover.webp)

## HAR Files - How Did We Get Here?

Many users of the web (and even many who develop it) tend to view the platform a-historically. They assume the web has always been, and will always be, as exactly as it is and could be no other way. For example, while talking to a co-worker about building this project, I wondered aloud who invented HAR files and where they came from.

His answer was something to the effect of, "may as well ask who invented bread." Not satisfied with this answer, I dug into the question myself. I quickly discovered a official document from 2012 claiming to be the file's specification.

Originally developed by the W3C's Web Performance Working Group, HAR files were designed to archive HTTP transactions. It was promoted by the Chrome DevTools team at Google as a "flexible format to record, export, and analyze network performance data" that would allow browsers to export in-depth loading performance data.

> And now, all of a sudden look at this! You have all the header information. Every header that the browser appends is here, even cookies. I probably don't want to show you that... umm...
>
> Ilya Grigorik - [The HAR Show: Capturing and Analyzing performance data with HTTP Archive format]() (August 28, 2012)

### From abandoned spec to browser standard

Unfortunately, [the official spec](https://w3c.github.io/web-performance/specs/HAR/Overview.html) opens at the top with a large, bolded message highlighted in red which states:

> **_DO NOT USE: This document was never published by the W3C Web Performance Working Group and has been abandoned._**

Since browser vendors are responsible and ethical stewards of the web platform, they removed the ability to download HAR files and collaborated to develop a new and more appropriate specification.

![wise guys](./images/wise-guys.webp)

At least that's what happened in some lucky parallel universe. In the current universe, everyone kept using HAR files. It was even built into all the other popular web browsers. The security concerns were always known but mostly ignored until a [highly visible and embarrassing security incident](https://sec.okta.com/articles/2023/10/tracking-unauthorized-access-oktas-support-system) woke everyone up to the dangers.

### Why the heck is everyone using an abandoned format?

The designation **_DO NOT USE_** would suggest that HAR files are not ready for production and should not be used by anyone under any circumstances, especially not you 🫵. Which naturally leads to the question, why have we continued to rely on a discontinued format invented in 2012 to the extent that it leads to a [heavily](https://blog.1password.com/files/okta-incident/okta-incident-report.pdf) [publicized](https://www.beyondtrust.com/blog/entry/okta-support-unit-breach) [security](https://blog.cloudflare.com/how-cloudflare-mitigated-yet-another-okta-compromise/) [incident](https://sec.okta.com/harfiles) in 2023?

Lets see what our pal ChatGPT has to say:

> HAR files are widely used despite the spec being abandoned because, as a standardized format for recording HTTP transactions, they're very useful for developers. They enable the analysis of each element a webpage loads. This is a critical feature for debugging issues related to performance and application behavior. Since browsers and developer tools had already implemented the use of HAR for performance analysis, they continued to support it."
>
> "Even though the formal specification process was not completed, the practical utility for developers in real-world troubleshooting and optimization outweighed the lack of an official standard. Moreover, there hasn't been a broadly accepted alternative matching the convenience and content provided by HAR files. The warning against using the format likely pertains to its security risks from containing sensitive data."
>
> **"However, developers mitigate this by using the format primarily in controlled environments and being cautious with the distribution of HAR files.**

Emphasis on the final comment is mine. It's a classic ChatGPT statement, the model makes a broad and highly questionable claim that rests on a naive assumption. In this answer, it is the assumption that people generally act responsibly and cautiously while performing tasks of consequence. Naturally, the AI's assumption that developers only use HAR files within controlled, safe environments is slightly divorced from reality in light of recent evidence.

## How Much is Security Emphasized in Existing Resources on HAR Files?

The developer-brain response to this dilemma is to include a warning somewhere in the documentation. Various versions of a disclaimer are included in documentation related to HAR files warning there will be sensitive and personally identifiable information contained in HAR files. Here's a few examples:

> Before sending the HAR file to us, ensure that you remove or obfuscate any sensitive information (such as any confidential or personally identifying information as well as confidential application information) using a text editor.
>
> After generating the `.har` file, open it in any text editor and examine the contents thoroughly to find PII and confidential information. For each value, replace it with REDACTED.

While the doc does provide a half-hearted suggestion to use a sample list of keywords they provide as a guide, using that sample list seems ill advised since the docs also go to great lengths to emphasize the sample list they're offering is incomplete and should not be fully relied upon. Here's another:

> HAR files may contain sensitive information such as authentication tokens, API keys, and session cookies. We recommend that you review the HAR file contents before adding them to a repository.

Taken at face value, this recommendation sounds reasonable enough. But it ignores the widely accepted security maxim that there is a trade-off between convenience and security. Even for the responsible developer, this quote underlines the more fundamental problem of determining what exactly "sensitive information" means anyway.

Sensitive information can tautologically be defined as information that hasn't been designated as non-sensitive. Personally identifiable information can similarly be defined as information that can be used to personally identify the identity of a person. Not very useful.

Another issue with current resources is that they rarely acknowledge HAR files can extend to thousands of lines of code. This makes manually examining their content wildly infeasible. So, how should a developer audit any given HAR file and determine what's sensitive and what's not? This is the question HAR Tools is looking to answer.