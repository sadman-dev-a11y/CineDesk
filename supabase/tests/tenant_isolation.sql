-- Run against a disposable local Supabase DB: supabase test db
-- Requires pgTAP; transaction rolls back all fixtures.
begin;
create extension if not exists pgtap with schema extensions;
set search_path=public,extensions;
select plan(10);
insert into auth.users(id,email,aud,role) values
('10000000-0000-4000-8000-000000000001','cinedesk-a@example.test','authenticated','authenticated'),
('10000000-0000-4000-8000-000000000002','cinedesk-b@example.test','authenticated','authenticated');
insert into public.organizations(id,name,created_by) values
('20000000-0000-4000-8000-000000000001','Org A','10000000-0000-4000-8000-000000000001'),
('20000000-0000-4000-8000-000000000002','Org B','10000000-0000-4000-8000-000000000002');
insert into public.organization_memberships(organization_id,user_id,role) values
('20000000-0000-4000-8000-000000000001','10000000-0000-4000-8000-000000000001','owner'),
('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000002','owner');
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
insert into public.projects(id,organization_id,title) values('30000000-0000-4000-8000-000000000001','20000000-0000-4000-8000-000000000001','Project A');
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
insert into public.projects(id,organization_id,title) values('30000000-0000-4000-8000-000000000002','20000000-0000-4000-8000-000000000002','Project B');
insert into public.scenes(project_id,number) values('30000000-0000-4000-8000-000000000002','1');
set local role authenticated;
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000001',true);
select is((select count(*) from public.projects),1::bigint,'A only reads own project');
select is((select count(*) from public.projects where id='30000000-0000-4000-8000-000000000002'),0::bigint,'A cannot fetch B by ID');
select is((select count(*) from public.scenes where project_id='30000000-0000-4000-8000-000000000002'),0::bigint,'A cannot read B scenes');
select throws_ok($$insert into public.scenes(project_id,number) values('30000000-0000-4000-8000-000000000002','2')$$,'42501',null,'A cannot insert B scenes');
with changed as (update public.organization_memberships set role='administrator' where organization_id='20000000-0000-4000-8000-000000000002' returning *) select is((select count(*) from changed),0::bigint,'A cannot alter B memberships');
select throws_ok($$insert into public.organization_memberships(organization_id,user_id,role) values('20000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000001','owner')$$,'42501',null,'A cannot enroll as B owner');
select set_config('request.jwt.claim.sub','10000000-0000-4000-8000-000000000002',true);
select is((select count(*) from public.projects),1::bigint,'B only reads own project');
select is((select count(*) from public.organizations),1::bigint,'B only reads own organization');
-- Change B to viewer using trusted setup role, then prove self-promotion fails.
reset role;
update public.organization_memberships set role='viewer' where user_id='10000000-0000-4000-8000-000000000002';
update public.project_memberships set role='viewer' where user_id='10000000-0000-4000-8000-000000000002';
set local role authenticated;
with changed as (update public.organization_memberships set role='owner' where user_id=auth.uid() returning *) select is((select count(*) from changed),0::bigint,'Viewer cannot promote own workspace role');
with changed as (update public.projects set title='Unauthorized' where id='30000000-0000-4000-8000-000000000002' returning *) select is((select count(*) from changed),0::bigint,'Viewer cannot edit project');
reset role;
select * from finish();
rollback;
