bits 64

%define sys_read 0
%define sys_write 1
%define sys_exit 0
%define stdout 1
%define stdin 0

%macro io 4
	mov eax, %1
	mov edi, %2
	mov esi, %3
	mov edx, %4

	syscall
%endmacro

section .bss
	%define buffer_len 64
	buffer: resb buffer_len

section .text
global _start
_start:
	io sys_write, stdout, welcome, welcome_len

	io sys_write, stdout, present, present_len
	io sys_read, stdin, buffer, buffer_len

	jmp sum

	io sys_write, stdout, esi, buffer_len

	mov eax, 60
	mov edi, 0
	syscall

sum:
	io sys_write, stdout, 3, 2

	mov eax, 60
	mov edi, 0
	syscall

section .data
	welcome: db 'Bem vindo a calculadora', 10
	welcome_len: equ $-welcome

	present: db 'Escolha uma operacao (0 - mais, 1 - menos): ', 10
	present_len: equ $-present
