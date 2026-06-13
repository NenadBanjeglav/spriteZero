# Use Convex for Vote Storage

The campaign needs real email-backed votes, city-level counts, and a live Serbia demand map, but the project cannot use another free Supabase project. We will use Convex for v1 vote storage because it integrates quickly with Vite and React, supports transactional server mutations for email deduplication, and provides reactive queries for live demand counts. The main trade-off is reduced portability compared with Postgres, which is acceptable for the first public campaign version.
