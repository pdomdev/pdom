## Instructions for wildcard subdomain setup by provider

### Vercel

- [Documentation](https://vercel.com/docs/projects/domains/working-with-domains#wildcard-domain)

### Cloudflare

1. Log in to your Cloudflare account and select ‘DNS’ from the menu on the left-hand side
2. Click ‘Add Record’ and set the record type as ‘CNAME Wildcard’
3. Enter your desired destination URL for the site in the value field before saving changes

### AWS Route 53

1. Log in to your AWS Console and select ‘Services’ from the top menu
2. Choose ‘Route53’ and open up the desired hosted zone for your domain name
3. Click on ‘Create Record Set’, set the record type as ‘CNAME Wildcard’, and enter the destination URL before saving changes

### Godaddy

1. Log in to the Domain Manager
2. Select your desired domain name
3. Click ‘Add DNS Record’ under the ‘DNS Zone File’ tab
4. Set the record type as ‘CNAME Wildcard’ and enter your destination URL in the value field before saving changes

### Namecheap

- Detailed [instructions](https://www.namecheap.com/support/knowledgebase/article.aspx/597/2237/how-can-i-set-up-a-catchall-wildcard-subdomain/)

