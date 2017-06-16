const _ = require('lodash')
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.'.split('')
const tlds = ['.com', '.org', '.net', '.co.uk', '.io', '.biz', '.rocks']
const domains = [
  {
      "is_default_bounce_domain":false,
      "status":{
        "spf_status":"invalid",
        "cname_status":"unverified",
        "ownership_verified":true,
        "abuse_at_status":"valid",
        "compliance_status":"valid",
        "verification_mailbox":"appteam",
        "verification_mailbox_status":"unverified",
        "dkim_status":"invalid",
        "postmaster_at_status":"unverified"
      },
      "domain":"100years.com",
      "shared_with_subaccounts":true
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"invalid",
        "abuse_at_status":"unverified",
        "compliance_status":"valid",
        "cname_status":"valid",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"100yearsv2.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"pending",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"hello.hello.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"pending",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"jasontest.rhodesjason.com",
      "shared_with_subaccounts":true
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"pending",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"jasontest2.rhodesjason.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"unverified",
        "abuse_at_status":"valid",
        "compliance_status":"valid",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"nancy-test.biz",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"unverified",
        "abuse_at_status":"valid",
        "compliance_status":"valid",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"nancy-test.tv",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"valid",
        "cname_status":"valid",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"oh.co",
      "shared_with_subaccounts":true
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"valid",
        "cname_status":"unverified",
        "dkim_status":"valid",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"spftest.ewandennis.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":true,
        "spf_status":"valid",
        "abuse_at_status":"valid",
        "compliance_status":"valid",
        "cname_status":"unverified",
        "dkim_status":"invalid",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"valid"
      },
      "domain":"test.spappteam.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"pending",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"testytest-fad-4698.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"pending",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      },
      "domain":"testytest2-fad-4698.com",
      "shared_with_subaccounts":false
  },
  {
      "is_default_bounce_domain":false,
      "subaccount_id":111,
      "domain":"asefasdf.com",
      "status":{
        "ownership_verified":false,
        "spf_status":"unverified",
        "abuse_at_status":"unverified",
        "compliance_status":"blocked",
        "cname_status":"unverified",
        "dkim_status":"unverified",
        "verification_mailbox_status":"unverified",
        "postmaster_at_status":"unverified"
      }
  }
]

module.exports = ({ n = domains.length } = {}) => {
  let results = _.clone(domains)
  while (results.length < n) {
    results.push(addDomain())
  }

  if (results.length > n) {
    results = results.slice(0, n)
  }

  // select a default bounce domain
  const bounce = _.sample(results)
  bounce.is_default_bounce_domain = true
  bounce.status.cname_status = 'valid'

  const altered = _.clone(_.sample(results))
  altered.domain = 'test-results-across-pages.com'
  altered.status.ownership_verified = true
  altered.is_default_bounce_domain = false
  results.shift() // keep the same n
  results.push(altered)

  const shuffled = _.shuffle(results)
  return shuffled
}

function addDomain() {
  const item = _.clone(_.sample(domains))

  if (Math.random() < 0.3) {
    // maybe keep existing domain and strip TLD
    item.domain = item.domain.replace(/.[^.*]*$/, '')
  } else {
    item.domain = ''
  }

  // add noise
  for (let i = 0; i < 3; i++) {
    item.domain = item.domain + _.sample(chars)
  }

  // add random TLD
  item.domain = item.domain + _.sample(tlds)

  return item
}
