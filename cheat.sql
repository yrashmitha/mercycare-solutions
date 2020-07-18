only have specialization
-------------------------------------------------------------

select users.* from users,user_specializations
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = 'Accounting' ))

-----------------------------------------------------
only have doctor name
-----------------------------------------------------

select users.* from users
where 
users.name like "%yohan%"

=============================================
only type
-----------------------------------------------
select users.* from users
where 
users.role_id =(select roles.id from roles where roles.role_name ="Nurse")


------------------------------------------------------
when have type and special
------------------------------------------------------
select users.* from users
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = 'Accounting' ))
and
users.role_id =(select roles.id from roles where roles.role_name ="Nurse")



===========================================
type and name
=============================================
select users.* from users
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = 'Accounting' ))
and
users.role_id =(select roles.id from roles where roles.role_name ="Nurse")
and
users.name like "%yohan%"




///

select users.* from users where users.name like "%acc%" and users.role_id =(select roles.id from roles where roles.role_name ="Nurse")


========================================================

===================================================
name and special
=====================================================
select users.* from users
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = 'Accounting' ))
and
users.name like "%yohan%"

==========================================


=========================




--------------------------------------------
when have all
--------------------------------------------
select users.name,users.id,specializations.specialization_name from user_specializations,users,specializations
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = null ))
and
users.role_id =(select roles.id from roles where roles.role_name =null)
and
users.name like "%Accoun%"
and
specializations.id=user_specializations.specialization_id
and
users.id=user_specializations.user_id
