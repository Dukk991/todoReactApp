drop table if exists task;

create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values ('Test task1');
insert into task (description) values ('Test task2');