---
layout: post
title: "How I reduced manual work by 95% using Zapier"
description: "A practical breakdown of using Paths, Formatters, and error handling to build automation that actually scales."
og_title: "How I reduced manual work by 95% using Zapier"
og_description: "A practical breakdown of using Paths, Formatters, and error handling to build automation that actually scales."
date: 2026-04-10
category_slug: coding
category_label: "Coding"
category_nav_label: "Coding"
topic: "Automation"
featured_image: /assets/images/posts/reduced_manual_work_zapier.png
featured_image_alt: "Image of "
featured_image_caption: "AI-generated."
tags:
  - "AI"
  - "Automation"
  - "Operations"
---
## One Zap, Four Scenarios

Yes, I admit I started by building one Zap per problem. It made sense at the time: one trigger, one outcome, done. Then the problems multiplied and I had four Zaps doing roughly the same thing, breaking in the same places, wasting plan tasks, needing to be updated separately every time something changed. The natural fix was to collapse them into one.

Zapier's Paths feature does exactly that. One trigger, four branches: each with its own conditions and actions firing based on what the lead actually looks like.

## What I built

Leads came in from Facebook Lead Ads. Not all of them needed the same response because we were testing how they all react. Some were highly urgent, some urgent, some had a specific eligibility condition, and some were low priority (priority was built on a set of conditions according to what they needed, so this definition mattered for the workflow). Each path handled its own sequence: log to spreadsheet, tag in the email list, send SMS if needed, notify the right person on success or failure.

Before the split, I ran everything through Formatter by Zapier. Form data comes in dirty: inconsistent capitalization, strings where you expect numbers, unexpected spaces. Formatter standardizes it once, upstream, so every branch works with clean data. Skipping this step makes working with it harder.

<figure class="post-image">
  <img src="/assets/images/posts/image1.png" alt="Image showing the Zapier workflow">
  <figcaption>First part of workflow </figcaption>
</figure>

The highly urgent path added a 1-minute delay before the SMS. The low priority path skipped SMS entirely and added a filter before logging, because not every low-priority lead needed to be notified immediately at all.

<figure class="post-image">
  <img src="/assets/images/posts/image2.png" alt="Image showing the Zapier workflow following its conditions">
  <figcaption>First two outcomes</figcaption>
</figure>

Every path that sent an SMS had two downstream branches: success and error. Both sent notifications just in case something breaks.

<figure class="post-image">
  <img src="/assets/images/posts/image3.png" alt="Image showing the Zapier workflow following its conditions">
  <figcaption>The last two outcomes</figcaption>
</figure>

All of them included a path to an e-mail marketing software called Mailchimp to include promotional stuff every now and then which was also automated (similar to Zapier).

## Best practices to avoid confusion later

Name paths clearly from the start. Test with real messy data, not clean test inputs. And resist the urge to add unrelated processes to the same Zap just because they share a trigger, that's how maintainable workflows become unmaintainable ones.

_Tools used: Zapier (Paths, Formatter, Filter, Delay), Facebook Lead Ads, RingCentral, Mailchimp, Microsoft Excel, Microsoft Outlook._

## Beyond Zapier on non-code AI tools

Automation on these kind of platforms is very straightforward, we just need to apply some thinking before doing something. Conditional workflows are the required, essential and fundamental standards for any industry, there is no workaround this: it's a non-negotiable, quasi-soft-skill. Propositional and first order logic can also boost automation strategies.

Zapier, Make.com, n8n, power automate... all these low-code (or no-code) tools are based on this fundamental standard I have described, and working with it is beyond these platforms. Automation on Python is slightly similar using if/else and for statements and even libraries like "liteflow" to define steps that execute conditionally are the basis of automation.

Once this is covered and understood, 90% of problems are solved.