PGDMP       +                }            social "   14.17 (Ubuntu 14.17-1.pgdg22.04+1)     17.4 (Ubuntu 17.4-1.pgdg22.04+2)     (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            +           1262    45097    social    DATABASE     r   CREATE DATABASE social WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE social;
                     postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                     postgres    false            ,           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                        postgres    false    4            -           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                        postgres    false    4            �            1259    53305    friend_requests    TABLE     O  CREATE TABLE public.friend_requests (
    id integer NOT NULL,
    from_user_id integer,
    to_user_id integer,
    status character varying(20),
    CONSTRAINT friend_requests_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'accepted'::character varying, 'declined'::character varying])::text[])))
);
 #   DROP TABLE public.friend_requests;
       public         heap r       postgres    false    4            �            1259    53304    friend_requests_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friend_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.friend_requests_id_seq;
       public               postgres    false    212    4            .           0    0    friend_requests_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.friend_requests_id_seq OWNED BY public.friend_requests.id;
          public               postgres    false    211            �            1259    53293    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password text,
    age integer
);
    DROP TABLE public.users;
       public         heap r       postgres    false    4            �            1259    53292    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    210    4            /           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    209            �           2604    53308    friend_requests id    DEFAULT     x   ALTER TABLE ONLY public.friend_requests ALTER COLUMN id SET DEFAULT nextval('public.friend_requests_id_seq'::regclass);
 A   ALTER TABLE public.friend_requests ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    211    212    212            �           2604    53296    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    209    210    210            %          0    53305    friend_requests 
   TABLE DATA           O   COPY public.friend_requests (id, from_user_id, to_user_id, status) FROM stdin;
    public               postgres    false    212   �       #          0    53293    users 
   TABLE DATA           P   COPY public.users (id, first_name, last_name, email, password, age) FROM stdin;
    public               postgres    false    210   	       0           0    0    friend_requests_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.friend_requests_id_seq', 1, true);
          public               postgres    false    211            1           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public               postgres    false    209            �           2606    53311 $   friend_requests friend_requests_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_pkey;
       public                 postgres    false    212            �           2606    53302    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    210            �           2606    53300    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    210            �           2606    53312 1   friend_requests friend_requests_from_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES public.users(id);
 [   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_from_user_id_fkey;
       public               postgres    false    3218    210    212            �           2606    53317 /   friend_requests friend_requests_to_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friend_requests
    ADD CONSTRAINT friend_requests_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES public.users(id);
 Y   ALTER TABLE ONLY public.friend_requests DROP CONSTRAINT friend_requests_to_user_id_fkey;
       public               postgres    false    210    212    3218            %      x�3�4�4�LLNN-(IM����� 0��      #   �   x�e���0@�u��_h��;q�!N��g#�
��_o4�ry��2�j�bA|4�	~B�3k'�������b�%�Zs�AT]fW.+��q�_fZ�*��ѹ�-�e+�7`  Of�
⚴<?��w���!����'�NG�q&!����U�<\M"��	w��I�US	w�(�/NA)     